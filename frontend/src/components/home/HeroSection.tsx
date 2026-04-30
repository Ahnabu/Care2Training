"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TrustBar } from "@/components/sections/TrustBar";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations();
  
  return (
    <section className="grid items-center gap-6 md:gap-8 lg:gap-12 lg:grid-cols-[1.03fr_1fr] py-[40px] md:py-[48px] lg:py-[56px] pb-[20px] md:pb-[28px] lg:pb-[36px]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
        className="grid gap-5"
      >
        <h1 className="font-display text-[clamp(2rem,9vw,4.5rem)] leading-[0.93] tracking-[-0.05em] text-foreground font-bold break-words sm:break-normal uppercase">
          {t("hero.title1")} <br />
          <span className="gradient-text">{t("hero.title2")}</span>
        </h1>
        <TrustBar />
        <p className="text-[clamp(1rem,1.8vw,1.5rem)] leading-[1.2] text-muted-foreground">
          {t("hero.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3.5 mt-2">
          <LocaleLink
            href="/book-appointment"
            className="flex justify-center rounded-full clay-button px-8 py-3.5 sm:py-3 text-[1rem] font-montserrat font-bold text-white transition-transform duration-200 ease-out active:scale-95"
          >
            {t("hero.ctaPrimary")}
          </LocaleLink>
          <LocaleLink
            href="/study-destinations"
            className="flex justify-center rounded-full px-8 py-3.5 sm:py-3 text-[1rem] font-montserrat font-bold transition-all duration-200 ease-in-out bg-foreground/10 border border-foreground/20 text-foreground hover:bg-foreground/15 active:scale-95"
          >
            {t("hero.ctaSecondary")}
          </LocaleLink>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut", delay: 0.18 }}
        className="relative min-h-[280px] sm:min-h-[400px] md:min-h-[520px] overflow-hidden rounded-[30px] border border-border bg-background shadow-[0_25px_50px_-30px_rgba(15,23,42,0.34)]"
      >
        <Image
          src="/care2training/assets/hero.CFN3UbLs_ee91eccbdc.jpeg"
          alt="Care2Training banner"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover object-center"
        />
      </motion.div>
    </section>
  );
}
