"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="grid items-center gap-[56px] md:gap-[72px] lg:grid-cols-[1.03fr_1fr] py-[40px] md:py-[48px] lg:py-[56px] pb-[20px] md:pb-[28px] lg:pb-[36px]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
        className="grid gap-7"
      >
        <h1 className="font-display text-[clamp(3rem,7vw,5.75rem)] leading-[0.93] tracking-[-0.05em] max-w-[12ch] text-foreground font-bold">
          Your Fast Track to Global Opportunities
        </h1>
        <p className="text-[clamp(1.25rem,2.1vw,2.05rem)] leading-[1.18] text-muted-foreground max-w-[25ch]">
          Secure your future with expert guidance on visa applications, top university placements, and international career growth.
        </p>
        <div className="flex flex-wrap gap-3.5">
          <button className="rounded-[18px] px-6 py-2.5 text-base font-semibold transition-all duration-200 ease-in-out bg-indigo-600 text-white shadow-[0_10px_20px_-12px_rgba(67,56,202,0.9)] hover:bg-indigo-700">
            Get Free Assessment
          </button>
          <button className="rounded-[18px] px-6 py-2.5 text-base font-semibold transition-all duration-200 ease-in-out bg-background text-foreground border border-border hover:border-indigo-200 hover:text-indigo-600">
            View Destinations
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut", delay: 0.18 }}
        className="relative min-h-[400px] md:min-h-[520px] overflow-hidden rounded-[30px] border border-border bg-background shadow-[0_25px_50px_-30px_rgba(15,23,42,0.34)]"
      >
        <Image
          src="https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?auto=format&fit=crop&w=1400&q=80"
          alt="Student standing confidently on an international university campus"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>
    </section>
  );
}
