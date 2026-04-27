"use client";

import { motion } from "framer-motion";
import { stats } from "./hero-data";

export function StatsStrip() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.28 }}
      className="w-full max-w-[944px] border border-border bg-background rounded-[30px] shadow-[0_20px_50px_-28px_rgba(15,23,42,0.24)] p-6 md:-mt-7 md:px-10 md:py-7"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {stats.map((item) => (
          <article key={item.label} className="flex items-center gap-4">
            <div className="shrink-0 grid place-items-center w-[52px] h-[52px] rounded-[18px] bg-indigo-50 text-indigo-600">
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
    </motion.section>
  );
}
