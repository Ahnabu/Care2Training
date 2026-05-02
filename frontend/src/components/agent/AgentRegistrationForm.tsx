"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function AgentRegistrationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    designation: "",
    country: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        designation: form.designation,
        country: form.country,
        message: form.message,
      };

      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || (data && data.ok === false)) {
        throw new Error(data?.message || "Unable to submit agent registration.");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", company: "", designation: "", country: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = Boolean(form.name.trim() && form.email.trim() && form.phone.trim());

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => setSubmitted(false), 3000);
    return () => clearTimeout(timer);
  }, [submitted]);

  return (
    <section className="py-6 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Agent Registration</h1>
        <p className="text-muted-foreground mb-8">Register as an agent and we'll get back to you.</p>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold uppercase text-foreground">Full name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="h-12 rounded-xl w-full border border-border px-4" />
            </div>
            <div>
              <label className="text-sm font-semibold uppercase text-foreground">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="h-12 rounded-xl w-full border border-border px-4" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold uppercase text-foreground">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} required className="h-12 rounded-xl w-full border border-border px-4" />
            </div>
            <div>
              <label className="text-sm font-semibold uppercase text-foreground">Company</label>
              <input name="company" value={form.company} onChange={handleChange} className="h-12 rounded-xl w-full border border-border px-4" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-semibold uppercase text-foreground">Designation</label>
              <input name="designation" value={form.designation} onChange={handleChange} className="h-12 rounded-xl w-full border border-border px-4" />
            </div>
            <div>
              <label className="text-sm font-semibold uppercase text-foreground">Country</label>
              <input name="country" value={form.country} onChange={handleChange} className="h-12 rounded-xl w-full border border-border px-4" />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold uppercase text-foreground">Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={5} className="rounded-xl w-full border border-border px-4 py-3" />
          </div>

          <button type="submit" disabled={!isValid || isSubmitting} className={cn("h-12 w-full rounded-xl font-bold uppercase", isValid && !isSubmitting ? "bg-primary text-white" : "bg-muted text-muted-foreground cursor-not-allowed")}>{isSubmitting ? "Submitting..." : submitted ? "✓ Submitted" : "Register"}</button>

          {error ? <p className="text-sm text-red-400">{error}</p> : null}
        </form>
      </div>
    </section>
  );
}
