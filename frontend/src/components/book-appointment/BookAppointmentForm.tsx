"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type StepId = "destination" | "study" | "contact" | "review";

const destinations = [
  { id: "uk", label: "United Kingdom" },
  { id: "canada", label: "Canada" },
  { id: "italy", label: "Italy" },
  { id: "australia", label: "Australia" },
] as const;

export function BookAppointmentForm() {
  const steps = useMemo<StepId[]>(() => ["destination", "study", "contact", "review"], []);
  const [step, setStep] = useState<StepId>("destination");

  const stepIndex = useMemo(() => steps.indexOf(step), [step, steps]);
  const progress = useMemo(() => Math.round(((stepIndex + 1) / steps.length) * 100), [stepIndex, steps.length]);

  const [form, setForm] = useState({
    destination: "" as string,
    course: "",
    english: "",
    fullName: "",
    email: "",
    phone: "",
    consultationType: "Online Meeting" as "Online Meeting" | "Phone Call" | "Office Visit",
  });

  const canNext = useMemo(() => {
    if (step === "destination") return Boolean(form.destination);
    if (step === "study") return Boolean(form.course);
    if (step === "contact") return Boolean(form.fullName && form.email && form.phone);
    return true;
  }, [form, step]);

  function goNext() {
    if (!canNext) return;
    const next = steps[stepIndex + 1];
    if (next) setStep(next);
  }

  function goBack() {
    const prev = steps[stepIndex - 1];
    if (prev) setStep(prev);
  }

  return (
    <section className="mt-10 rounded-3xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="p-6 md:p-8 border-b border-border/70">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">
            Step {stepIndex + 1} of {steps.length}
          </p>
          <p className="text-sm font-semibold text-muted-foreground">{progress}%</p>
        </div>
        <div className="mt-3 h-2 rounded-full bg-muted">
          <div className="h-2 rounded-full bg-primary transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="p-6 md:p-8">
        {step === "destination" ? (
          <div className="grid gap-6">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-[-0.03em]">Where do you want to study?</h2>
              <p className="mt-2 text-muted-foreground">Pick a destination to start. This reduces friction and increases completion.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {destinations.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, destination: d.label }))}
                  className={cn(
                    "text-left rounded-2xl border border-border/70 p-5 shadow-sm transition hover:border-border",
                    "bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40",
                    form.destination === d.label ? "ring-2 ring-primary/40 border-border" : ""
                  )}
                >
                  <p className="font-display text-xl font-bold tracking-[-0.02em] text-foreground">{d.label}</p>
                  <p className="mt-1.5 text-[0.98rem] text-muted-foreground">View requirements, timeline, and a guided plan.</p>
                </button>
              ))}
            </div>

            <div className="rounded-2xl bg-muted p-4 text-[0.98rem] text-muted-foreground">
              <span className="font-semibold text-foreground">Social proof:</span> Join hundreds of students who move forward each month with a clear checklist.
            </div>
          </div>
        ) : null}

        {step === "study" ? (
          <div className="grid gap-5">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-[-0.03em]">Your study preference</h2>
              <p className="mt-2 text-muted-foreground">A few details help us route you to the right advisor.</p>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-bold text-foreground" htmlFor="course">
                  Preferred course of study
                </label>
                <input
                  id="course"
                  value={form.course}
                  onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground"
                  placeholder="e.g., Nursing, Business, Computer Science"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-bold text-foreground" htmlFor="english">
                  English proficiency test & score (optional)
                </label>
                <input
                  id="english"
                  value={form.english}
                  onChange={(e) => setForm((f) => ({ ...f, english: e.target.value }))}
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground"
                  placeholder="e.g., IELTS 6.5"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-bold text-foreground" htmlFor="consultation">
                  Consultation type
                </label>
                <select
                  id="consultation"
                  value={form.consultationType}
                  onChange={(e) => setForm((f) => ({ ...f, consultationType: e.target.value as any }))}
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground"
                >
                  <option>Online Meeting</option>
                  <option>Phone Call</option>
                  <option>Office Visit</option>
                </select>
              </div>
            </div>
          </div>
        ) : null}

        {step === "contact" ? (
          <div className="grid gap-5">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-[-0.03em]">Your contact details</h2>
              <p className="mt-2 text-muted-foreground">We’ll use these to confirm your appointment.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2 sm:col-span-2">
                <label className="text-sm font-bold text-foreground" htmlFor="fullName">
                  Full name
                </label>
                <input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground"
                  placeholder="Your name"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-bold text-foreground" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground"
                  placeholder="you@example.com"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-bold text-foreground" htmlFor="phone">
                  Phone / WhatsApp
                </label>
                <input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground"
                  placeholder="+880 ..."
                />
              </div>
            </div>
          </div>
        ) : null}

        {step === "review" ? (
          <div className="grid gap-6">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-[-0.03em]">Review</h2>
              <p className="mt-2 text-muted-foreground">Confirm your details. (Submission wiring comes later.)</p>
            </div>

            <div className="grid gap-3 rounded-2xl border border-border bg-background p-5">
              <Row label="Destination" value={form.destination} />
              <Row label="Course" value={form.course} />
              <Row label="English" value={form.english || "—"} />
              <Row label="Consultation" value={form.consultationType} />
              <Row label="Name" value={form.fullName} />
              <Row label="Email" value={form.email} />
              <Row label="Phone" value={form.phone} />
            </div>

            <div className="rounded-2xl bg-muted p-4 text-[0.98rem] text-muted-foreground">
              <span className="font-semibold text-foreground">Reassurance:</span> Your information is used only to confirm your appointment.
            </div>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 font-bold text-primary-foreground hover:bg-primary/90"
            >
              Submit (UI only)
            </button>
          </div>
        ) : null}

        <div className="mt-10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            className={cn(
              "inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-5 font-bold text-foreground hover:border-border/80",
              stepIndex === 0 ? "invisible" : ""
            )}
          >
            Back
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={!canNext || step === "review"}
            className={cn(
              "inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 font-bold text-primary-foreground hover:bg-primary/90",
              !canNext || step === "review" ? "opacity-50 cursor-not-allowed hover:bg-primary" : ""
            )}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
      <p className="text-[1rem] font-semibold text-foreground">{value}</p>
    </div>
  );
}

