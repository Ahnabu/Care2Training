import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 4000;
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
const appointmentApiUrl = process.env.APPOINTMENT_API_URL?.trim();
const appointmentApiMethod = (process.env.APPOINTMENT_API_METHOD || "POST").toUpperCase();
const appointmentApiHeadersJson = process.env.APPOINTMENT_API_HEADERS_JSON?.trim();
const smtpHost = process.env.SMTP_HOST?.trim();
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = (process.env.SMTP_SECURE || "false").toLowerCase() === "true";
const smtpUser = process.env.SMTP_USER?.trim();
const smtpPass = process.env.SMTP_PASS?.trim();
const mailFrom = process.env.MAIL_FROM?.trim();
const mailTo = process.env.MAIL_TO?.trim();
const mailSubject = process.env.MAIL_SUBJECT?.trim() || "New appointment request";

app.use(
  cors({
    origin: corsOrigin,
  })
);
app.use(express.json());

type AppointmentFormPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  destination?: string;
  course?: string;
  english?: string;
  subjects?: string;
  consultationType?: string;
  inquiry?: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function buildMessageBody(payload: Required<Pick<AppointmentFormPayload, "fullName" | "email" | "phone" | "destination" | "subjects" | "consultationType" | "inquiry">> & Pick<AppointmentFormPayload, "course" | "english">) {
  return [
    `Full name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Phone/WhatsApp: ${payload.phone}`,
    `Study destination: ${payload.destination}`,
    `Course of study: ${payload.course || "-"}`,
    `English test & score: ${payload.english || "-"}`,
    `Preferred subjects: ${payload.subjects}`,
    `Consultation type: ${payload.consultationType}`,
    "",
    "Inquiry:",
    payload.inquiry,
  ].join("\n");
}

async function forwardToAppointmentApi(payload: AppointmentFormPayload) {
  if (!appointmentApiUrl) {
    return { forwarded: false };
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (appointmentApiHeadersJson) {
    try {
      const parsedHeaders = JSON.parse(appointmentApiHeadersJson) as Record<string, string>;
      for (const [key, value] of Object.entries(parsedHeaders)) {
        if (typeof value === "string" && value.trim()) {
          headers[key] = value;
        }
      }
    } catch {
      throw new Error("APPOINTMENT_API_HEADERS_JSON must be valid JSON");
    }
  }

  const response = await fetch(appointmentApiUrl, {
    method: appointmentApiMethod,
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => "");
    throw new Error(responseText || `Appointment API request failed with status ${response.status}`);
  }

  return { forwarded: true };
}

async function sendAppointmentEmail(payload: AppointmentFormPayload) {
  if (!smtpHost || !smtpUser || !smtpPass || !mailTo || !mailFrom) {
    return { emailed: false };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: mailFrom,
    to: mailTo,
    subject: mailSubject,
    text: buildMessageBody({
      fullName: payload.fullName || "",
      email: payload.email || "",
      phone: payload.phone || "",
      destination: payload.destination || "",
      course: payload.course,
      english: payload.english,
      subjects: payload.subjects || "",
      consultationType: payload.consultationType || "",
      inquiry: payload.inquiry || "",
    }),
  });

  return { emailed: true };
}

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "caretraining-backend",
    time: new Date().toISOString(),
  });
});

app.post("/api/book-appointment", async (req, res) => {
  const payload = req.body as AppointmentFormPayload;

  const requiredFields = [
    ["fullName", payload.fullName],
    ["email", payload.email],
    ["phone", payload.phone],
    ["destination", payload.destination],
    ["subjects", payload.subjects],
    ["consultationType", payload.consultationType],
    ["inquiry", payload.inquiry],
  ] as const;

  const missingFields = requiredFields
    .filter(([, value]) => !isNonEmptyString(value))
    .map(([field]) => field);

  if (missingFields.length > 0) {
    res.status(400).json({
      ok: false,
      message: "Missing required fields",
      missingFields,
    });
    return;
  }

  try {
    const apiResult = await forwardToAppointmentApi(payload);
    const mailResult = await sendAppointmentEmail(payload);

    if (!apiResult.forwarded && !mailResult.emailed) {
      res.status(500).json({
        ok: false,
        message: "No appointment destination is configured",
      });
      return;
    }

    res.status(200).json({
      ok: true,
      forwardedToApi: apiResult.forwarded,
      emailed: mailResult.emailed,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit appointment";
    res.status(500).json({
      ok: false,
      message,
    });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});
