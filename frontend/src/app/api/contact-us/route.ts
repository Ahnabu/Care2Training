import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  subject?: string;
  message?: string;
};

function getBackendEndpoint() {
  const backendBaseUrl = process.env.BACKEND_API_URL?.trim();
  if (!backendBaseUrl) return null;
  return `${backendBaseUrl.replace(/\/+$/, "")}/api/contact-us`;
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;

  const backendEndpoint = getBackendEndpoint();

  if (!backendEndpoint) {
    return NextResponse.json(
      { ok: false, message: "BACKEND_API_URL is not configured." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(backendEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = (await response.json().catch(() => null)) as Record<string, unknown> | null;

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: (result?.message as string) || "Submission failed.",
          errors: result?.errors,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { ok: true, message: (result?.message as string) || "Message sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Network error.";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
