"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "c2t_lead_modal_next_show_at";
const DEFAULT_COOLDOWN_DAYS = 3;

function nowMs() {
  return Date.now();
}

function daysToMs(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

export function AutoLeadCaptureModal() {
  const [open, setOpen] = useState(false);
  const cooldownDays = DEFAULT_COOLDOWN_DAYS;
  const pathname = usePathname();

  const locale = useMemo(() => {
    const first = (pathname || "/").split("/")[1];
    return first === "bn" ? "bn" : "en";
  }, [pathname]);

  function hrefWithLocale(href: string) {
    return `/${locale}${href === "/" ? "" : href}`;
  }

  const shouldShow = useMemo(() => {
    if (typeof window === "undefined") return false;
    const nextShowAt = Number(window.localStorage.getItem(STORAGE_KEY) || "0");
    return nowMs() >= nextShowAt;
  }, []);

  useEffect(() => {
    if (!shouldShow) return;
    const t = window.setTimeout(() => setOpen(true), 550);
    return () => window.clearTimeout(t);
  }, [shouldShow]);

  function snooze(days = cooldownDays) {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(nowMs() + daysToMs(days)));
    } catch {}
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) snooze();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[min(980px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border bg-background shadow-[0_30px_80px_-50px_rgba(0,0,0,0.55)]">
          <div className="flex items-start justify-between gap-4 border-b border-border/70 p-6 md:p-8">
            <div className="grid gap-2">
              <Dialog.Title className="font-display text-2xl md:text-3xl font-bold tracking-[-0.03em]">
                Get Expert Advice for Your Future Abroad
              </Dialog.Title>
              <Dialog.Description className="text-[1rem] md:text-lg text-muted-foreground">
                Start with a short form now, or book a full appointment in one click.
              </Dialog.Description>
            </div>

            <Dialog.Close
              aria-label="Close"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground hover:border-border/80"
              onClick={() => snooze()}
            >
              <X size={18} />
            </Dialog.Close>
          </div>

          <div className="max-h-[75vh] overflow-auto p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <form className="rounded-3xl border border-border bg-card p-6 md:p-7 shadow-sm">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-foreground" htmlFor="leadName">
                      Full name
                    </label>
                    <input id="leadName" className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-foreground" htmlFor="leadPhone">
                      Phone / WhatsApp
                    </label>
                    <input id="leadPhone" className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-foreground" htmlFor="leadDestination">
                      Preferred study destination
                    </label>
                    <select id="leadDestination" className="h-11 w-full rounded-xl border border-border bg-background px-3 text-foreground">
                      <option value="">Please choose</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Italy</option>
                      <option>Australia</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    className="mt-2 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
                    onClick={() => {
                      // UI-only for now; later wire to backend
                      snooze(14);
                      setOpen(false);
                    }}
                  >
                    Get consultation (UI)
                  </button>

                  <p className="text-[0.95rem] text-muted-foreground">
                    Tip: if you prefer, book a full appointment instead.
                  </p>
                </div>
              </form>

              <div className="grid gap-4">
                <div className="rounded-3xl border border-border bg-card p-6 md:p-7 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-muted-foreground">Quick option</p>
                  <p className="mt-2 text-lg font-semibold text-foreground">Book an appointment</p>
                  <p className="mt-2 text-[1rem] leading-relaxed text-muted-foreground">
                    Use our step-by-step appointment form (multi-step, high-completion design).
                  </p>
                  <div className="mt-4">
                    <Dialog.Close asChild>
                      <Link
                        href={hrefWithLocale("/book-appointment")}
                        className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 font-bold text-primary-foreground hover:bg-primary/90"
                        onClick={() => snooze(14)}
                      >
                        Book now
                      </Link>
                    </Dialog.Close>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

