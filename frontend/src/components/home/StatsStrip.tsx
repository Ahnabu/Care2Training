"use client";

import { motion } from "framer-motion";
import { Building2, Rocket, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export function StatsStrip() {
  const t = useTranslations("stats");

  const stats = [
    { label: t("visaSuccess"), value: "98%", icon: ShieldCheck },
    { label: t("partners"), value: "50+", icon: Building2 },
    { label: t("careers"), value: "10,000+", icon: Rocket },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.28 }}
      className="w-full flex justify-center -mt-16 md:-mt-20 lg:-mt-24 relative z-10"
    >
      <div className="max-w-200 border border-border bg-background rounded-[30px] shadow-[0_20px_50px_-28px_rgba(15,23,42,0.24)] p-4 sm:p-6 md:px-10 md:py-7">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {stats.map((item) => (
          <article key={item.label} className="flex items-center gap-4">
            <div className="shrink-0 grid place-items-center w-13 h-13 rounded-[18px] bg-primary/10 text-primary">
              <item.icon size={28} strokeWidth={2} />
            </div>
            <div>
              <p className="font-display text-[clamp(2.25rem,3vw,2.75rem)] font-bold leading-none tracking-[-0.03em] text-foreground">
                {item.value}
              </p>
              <p className="mt-1.5 text-[clamp(1rem,1.2vw,1.15rem)] leading-tight text-muted-foreground">{item.label}</p>
            </div>
          </article>
        ))}
      </div>
      </div>
    </motion.section>
  );
}
