"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GraduationCap, Home } from "lucide-react";
import { LocaleLink } from "@/components/i18n/LocaleLink";

export function GetToKnowAboutUsSection() {
  const t = useTranslations();

  return (
    <section className="py-12 md:py-24 overflow-hidden relative">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-24 items-center">
        <div className="grid gap-6 relative z-10 px-1 sm:px-0">
          <div className="space-y-3">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
              GET TO KNOW ABOUT US
            </p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.8rem)] font-bold tracking-[-0.05em] text-primary leading-[0.95] max-w-[12ch]">
              {t("site.name")}
            </h2>
          </div>

          <div className="space-y-4 text-[0.98rem] md:text-[1.05rem] text-muted-foreground leading-relaxed max-w-[64ch]">
            <p>{t("aboutPreview.p1")}</p>
            <p>{t("aboutPreview.p2")}</p>
            <p>{t("aboutPreview.p3")}</p>
          </div>

          <div className="pt-2">
            <LocaleLink
              href="/book-appointment"
              className="inline-flex h-12 md:h-14 items-center justify-center rounded-full border border-border bg-background px-8 md:px-10 font-montserrat font-bold text-foreground hover:border-primary hover:text-primary transition-colors shadow-sm"
            >
              {t("site.cta.bookAppointment")}
            </LocaleLink>
          </div>
        </div>

        <div className="relative isolate px-0 sm:px-4 lg:px-0 lg:pl-6 xl:pl-10">
          <div
            className="pointer-events-none absolute -left-2 top-4 hidden sm:block h-40 w-40 text-primary/20"
            style={{ backgroundImage: "radial-gradient(circle, currentColor 2px, transparent 2.5px)", backgroundSize: "20px 20px" }}
          />
          <div
            className="pointer-events-none absolute -bottom-8 right-0 hidden sm:block h-40 w-40 text-primary/20"
            style={{ backgroundImage: "radial-gradient(circle, currentColor 2px, transparent 2.5px)", backgroundSize: "20px 20px" }}
          />

          <div className="grid gap-5 lg:grid-cols-[minmax(220px,1fr)_minmax(280px,420px)_minmax(220px,1fr)] lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <div className="rounded-[22px] border border-white/70 bg-white/95 p-4 sm:p-5 shadow-[0_16px_35px_-20px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e8f0fe] text-[#1967d2] dark:bg-blue-500/20 dark:text-blue-300">
                    <Home size={22} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-foreground">{t("aboutPreview.accommodation")}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t("aboutPreview.accommodationDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 18 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="order-1 lg:order-2"
            >
              <div className="relative mx-auto w-full max-w-[420px] aspect-[4/5] overflow-hidden rounded-[30px] border border-border/40 bg-background shadow-[0_24px_60px_-35px_rgba(15,23,42,0.35)]">
                <Image
                  src="/care2training/assets/about.KWabaQlx_ad538549ec.jpg"
                  alt={t("site.name")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/16 via-transparent to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="order-3 lg:order-3"
            >
              <div className="rounded-[22px] border border-white/70 bg-white/95 p-4 sm:p-5 shadow-[0_16px_35px_-20px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f3e8fd] text-[#7a1abf] dark:bg-purple-500/20 dark:text-purple-300">
                    <GraduationCap size={22} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-foreground">{t("aboutPreview.careerCounselling")}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {t("aboutPreview.careerCounsellingDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
