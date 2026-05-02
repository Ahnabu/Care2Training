import { NextResponse } from "next/server";

type AgentPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  designation?: string;
  country?: string;
  message?: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function getBackendEndpoint() {
  const backendBaseUrl = process.env.BACKEND_API_URL?.trim();
  if (!backendBaseUrl) return null;
  return `${backendBaseUrl.replace(/\/+$/, "")}/api/agents`;
}

export async function POST(request: Request) {
  const payload = (await request.json()) as AgentPayload;

  const requiredFields = [
    ["name", payload.name],
    ["email", payload.email],
    ["phone", payload.phone],
  ] as const;

  const missingFields = requiredFields
    .filter(([, value]) => !isNonEmptyString(value))
    .map(([field]) => field);

  if (missingFields.length > 0) {
    return NextResponse.json(
      { ok: false, message: "Missing required fields", missingFields },
      { status: 400 }
    );
  }

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

    const result = (await response.json().catch(() => null)) as
      | { ok?: boolean; message?: string }
      | null;

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, message: result?.message || "Agent registration failed." },
        { status: response.status }
      );
    }

    return NextResponse.json({ ok: true, backendResponse: result }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit agent registration.";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
