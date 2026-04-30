"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const studyDestinations = [
  "Study in Canada",
  "Study in Ireland",
  "Study in Germany",
  "Study in Italy",
  "Study in Malaysia",
  "Study in France",
  "Study in Poland",
  "Study in Croatia",
  "Study in Australia",
  "Study in UK",
  "Study in Hungary",
  "Study in USA",
  "Study in Lithuania",
  "Study in Latvia",
  "Study in Malta",
  "Study in Cyprus",
] as const;

const consultationTypes = [
  "Online Meeting",
  "Phone Call",
  "Office Visit",
] as const;

export function BookAppointmentForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    course: "",
    english: "",
    subjects: "",
    consultationType: "",
    inquiry: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!response.ok || !result?.ok) {
        throw new Error(result?.message || "Unable to submit the form right now.");
      }

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setForm({
        fullName: "",
        email: "",
        phone: "",
        destination: "",
        course: "",
        english: "",
        subjects: "",
        consultationType: "",
        inquiry: "",
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to submit the form right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    form.fullName.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.destination &&
    form.subjects.trim() &&
    form.consultationType &&
    form.inquiry.trim();

  return (
    <section className="py-4 md:py-10">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-4">
            Book an appointment
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            A short, step-by-step form designed to be easy to finish.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
              {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              {/* Full Name and Email */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="fullName" className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-xl border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                    placeholder=""
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-xl border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                    placeholder=""
                  />
                </div>
              </div>

              {/* Phone and Study Destination */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Phone/WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-xl border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                    placeholder=""
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="destination" className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Study Destination <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="destination"
                    name="destination"
                    value={form.destination}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-2xl border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                  >
                    <option value="">Choose a destination</option>
                    {studyDestinations.map((dest) => (
                      <option key={dest} value={dest}>
                        {dest}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Course and English */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="course" className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Course of Study
                  </label>
                  <input
                    id="course"
                    name="course"
                    type="text"
                    value={form.course}
                    onChange={handleChange}
                    className="h-12 rounded-xl border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                    placeholder=""
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="english" className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    English Test & Score
                  </label>
                  <input
                    id="english"
                    name="english"
                    type="text"
                    value={form.english}
                    onChange={handleChange}
                    className="h-12 rounded-xl border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                    placeholder="e.g., IELTS 6.5"
                  />
                </div>
              </div>

              {/* Subjects and Consultation */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor="subjects" className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Preferred Subjects <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subjects"
                    name="subjects"
                    type="text"
                    value={form.subjects}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-xl border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                    placeholder=""
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="consultationType" className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Consultation Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="consultationType"
                    name="consultationType"
                    value={form.consultationType}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-2xl border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                  >
                    <option value="">Choose type</option>
                    {consultationTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Inquiry Textarea */}
              <div className="grid gap-2">
                <label htmlFor="inquiry" className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Tell us more <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="inquiry"
                  name="inquiry"
                  value={form.inquiry}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition resize-none"
                  placeholder=""
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={cn(
                  "w-full h-12 rounded-xl font-bold uppercase tracking-wider transition-all",
                  isFormValid && !isSubmitting
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                {isSubmitting ? "Submitting..." : submitted ? "✓ Submitted" : "Get Consultation"}
              </button>

              {submitError ? (
                <p className="text-sm font-medium text-red-400" role="alert">
                  {submitError}
                </p>
              ) : null}
            </form>
          </div>

          {/* Sidebar - Contact & Offices */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-8">
              {/* Contact Card */}
              <div className="rounded-2xl border border-border bg-card/50 backdrop-blur p-6 md:p-8">
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-foreground mb-6">
                  Contact
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Email</p>
                    <a href="mailto:info@care2training.com" className="text-foreground font-semibold hover:text-primary transition">
                      info@care2training.com
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Phone</p>
                    <div className="space-y-1">
                      <a href="tel:+8801842497766" className="block text-foreground font-semibold hover:text-primary transition">
                        +880 1842 497 766
                      </a>
                      <a href="tel:+442035762072" className="block text-foreground font-semibold hover:text-primary transition">
                        +44 0203 576 2072
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offices Card */}
              <div className="rounded-2xl border border-border bg-card/50 backdrop-blur p-6 md:p-8">
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-foreground mb-6">
                  Offices
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Bangladesh</p>
                    <p className="text-sm text-foreground leading-relaxed">
                      36, Garib-E-Newaz Avenue, Level-3, Sector-13, Uttara, Dhaka-1230
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">UK</p>
                    <p className="text-sm text-foreground leading-relaxed">
                      Unit 301, 3rd Floor, 7 Kirkdale Road, Bushwood, London E11 1HP
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
