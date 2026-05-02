"use client";

import React, { useState } from "react";

export default function ContactFormClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((s) => ({ ...s, [e.target.id]: e.target.value }));
    setErrors((s) => {
      if (!s[e.target.id]) return s;
      const copy = { ...s };
      delete copy[e.target.id];
      return copy;
    });
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    setSuccess("");
    try {
      const res = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data?.errors) setErrors(data.errors);
        else setErrors({ _global: [data?.message || "Submission failed"] });
      } else {
        setSuccess(data?.message || "Message sent successfully.");
        setForm({ name: "", email: "", phone: "", country: "", subject: "", message: "" });
      }
    } catch (err) {
      setErrors({ _global: ["Network error"] });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        {success ? <p className="col-span-2 rounded-md bg-green-100 p-2 text-green-800">{success}</p> : null}
        {errors._global ? (
          <p className="col-span-2 rounded-md bg-red-100 p-2 text-red-700">{errors._global[0]}</p>
        ) : null}

        <div className="grid gap-2">
          <label className="text-sm font-bold text-foreground" htmlFor="name">Full name</label>
          <input id="name" value={form.name} onChange={handleChange} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground" />
          {errors.name && <p className="text-red-600 text-sm">{errors.name[0]}</p>}
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-bold text-foreground" htmlFor="email">Email</label>
          <input id="email" type="email" value={form.email} onChange={handleChange} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground" />
          {errors.email && <p className="text-red-600 text-sm">{errors.email[0]}</p>}
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-bold text-foreground" htmlFor="phone">Phone / WhatsApp</label>
          <input id="phone" value={form.phone} onChange={handleChange} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground" />
          {errors.phone && <p className="text-red-600 text-sm">{errors.phone[0]}</p>}
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-bold text-foreground" htmlFor="country">Country</label>
          <input id="country" value={form.country} onChange={handleChange} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground" />
          {errors.country && <p className="text-red-600 text-sm">{errors.country[0]}</p>}
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <label className="text-sm font-bold text-foreground" htmlFor="subject">Subject</label>
          <input id="subject" value={form.subject} onChange={handleChange} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground" />
          {errors.subject && <p className="text-red-600 text-sm">{errors.subject[0]}</p>}
        </div>

        <div className="grid gap-2 sm:col-span-2">
          <label className="text-sm font-bold text-foreground" htmlFor="message">Message</label>
          <textarea id="message" rows={5} value={form.message} onChange={handleChange} className="w-full rounded-xl border border-border bg-background p-3 text-foreground" />
          {errors.message && <p className="text-red-600 text-sm">{errors.message[0]}</p>}
        </div>

        <div className="sm:col-span-2">
          <button type="submit" disabled={submitting} className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-8 font-bold text-primary-foreground hover:bg-primary/90">
            {submitting ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </form>
  );
}
