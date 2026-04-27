import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Care2 Training",
  description: "Contact Care2 Training for study abroad guidance and appointments.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12 py-12 md:py-16">
      <header className="grid gap-4 max-w-[70ch]">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-[-0.04em]">Contact</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Send us a message and we’ll get back to you. (This is a UI-first form; backend wiring can be added later.)
        </p>
      </header>

      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        <form className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-bold text-foreground" htmlFor="name">
                Full name
              </label>
              <input id="name" className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-bold text-foreground" htmlFor="email">
                Email
              </label>
              <input id="email" type="email" className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-bold text-foreground" htmlFor="phone">
                Phone / WhatsApp
              </label>
              <input id="phone" className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-bold text-foreground" htmlFor="message">
                Message
              </label>
              <textarea id="message" rows={5} className="w-full rounded-xl border border-border bg-background p-3 text-foreground" />
            </div>
            <button type="button" className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90">
              Send message
            </button>
          </div>
        </form>

        <div className="grid gap-5">
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Email</p>
            <p className="mt-2 text-lg font-semibold text-foreground">info@care2training.com</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Phone</p>
            <p className="mt-2 text-lg font-semibold text-foreground">+880 1842 497 766</p>
            <p className="mt-1 text-lg font-semibold text-foreground">+44 0203 576 2072</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Offices</p>
            <p className="mt-2 font-semibold text-foreground">Bangladesh</p>
            <p className="text-muted-foreground">Uttara, Dhaka-1230</p>
            <p className="mt-3 font-semibold text-foreground">UK</p>
            <p className="text-muted-foreground">London E11 1HP</p>
          </div>
        </div>
      </section>
    </main>
  );
}

