"use client";

import { motion } from "framer-motion";
import { ChevronDown, Mail, MapPin } from "lucide-react";
import { navItems } from "./hero-data";

export function HomeNavbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="grid gap-[18px] pt-1.5 pb-[18px] md:gap-[22px]"
    >
      <div className="flex items-center justify-between gap-4 py-2.5 border-b border-border text-foreground">
        <div className="flex items-center gap-[22px] flex-wrap">
          <a className="inline-flex items-center gap-2 text-[0.95rem] leading-none text-foreground whitespace-nowrap hover:text-indigo-600" href="mailto:info@care2training.com">
            <Mail size={16} strokeWidth={2.2} className="text-indigo-600 shrink-0" />
            <span>info@care2training.com</span>
          </a>
          <a className="inline-flex items-center gap-2 text-[0.95rem] leading-none text-foreground whitespace-nowrap hover:text-indigo-600" href="tel:+8801842497766">
            <span className="w-[22px] h-[16px] rounded-[2px] shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)] shrink-0 bg-[#0f8f4d] relative overflow-hidden flex items-center justify-center" aria-hidden="true">
              <span className="w-2 h-2 rounded-full bg-red-600 inline-block"></span>
            </span>
            <span>+880 1842 497 766</span>
          </a>
          <a className="inline-flex items-center gap-2 text-[0.95rem] leading-none text-foreground whitespace-nowrap hover:text-indigo-600" href="tel:+4402035762072">
            <span className="w-[22px] h-[16px] rounded-[2px] shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)] shrink-0 bg-gradient-to-br from-blue-700 via-white to-red-500 relative flex items-center justify-center overflow-hidden" aria-hidden="true">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-transparent"></span>
            </span>
            <span>+44 0203 576 2072</span>
          </a>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl bg-background text-foreground text-[0.95rem] font-semibold shadow-[0_8px_18px_-14px_rgba(15,23,42,0.22)]" type="button">
            <span>English</span>
            <ChevronDown size={14} strokeWidth={2.4} />
          </button>
          <button className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#2747ca] text-white text-[0.98rem] font-bold shadow-[0_14px_28px_-18px_rgba(39,71,202,0.8)]" type="button">
            Become an Agent
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-6">
        <a className="inline-flex items-center gap-3 shrink-0" href="#">
          <span className="inline-flex items-center justify-center w-[72px] h-[54px] rounded-xl bg-gradient-to-br from-indigo-100 via-blue-50 to-white text-[#2747ca] text-[1.6rem] font-extrabold tracking-[-0.04em] shadow-[inset_0_0_0_1px_rgba(39,71,202,0.08)]" aria-hidden="true">
            C2
          </span>
          <span className="grid gap-0.5">
            <span className="font-display text-base font-bold text-[#2747ca] tracking-[-0.02em]">Care2 Training</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-foreground">
          {navItems.map((item, index) => {
            const isDropdown = index === 2 || index === 0;

            return (
              <a key={item.label} href={item.href} className="text-[1.04rem] font-medium transition-colors duration-200 hover:text-indigo-600">
                <span className="inline-flex items-center gap-1.5">
                  {item.label}
                  {isDropdown ? <ChevronDown size={16} /> : null}
                </span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#2747ca] text-white text-[1.05rem] font-bold shadow-[0_16px_32px_-18px_rgba(39,71,202,0.8)] hover:bg-[#1a3399]" type="button">
            Book an Appointment
          </button>
        </div>
      </div>
    </motion.header>
  );
}
