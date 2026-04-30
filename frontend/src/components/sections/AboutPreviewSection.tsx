"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { motion } from "framer-motion";
import { GraduationCap, Home } from "lucide-react";

export function AboutPreviewSection() {
  const t = useTranslations();

  return (
    <section className="py-12 md:py-24 overflow-hidden relative">
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-24 items-center">
        {/* Left side: Image and Floating Cards */}
        <div className="relative order-2 lg:order-1 flex flex-col items-center lg:block mt-8 lg:mt-0 pr-0 lg:pr-8">
          
          {/* Decorative Dot Grid (Top Left) */}
          <div 
            className="absolute -top-10 -left-4 sm:left-4 w-40 h-40 text-primary opacity-20 pointer-events-none hidden sm:block" 
            style={{ backgroundImage: "radial-gradient(circle, currentColor 2px, transparent 2.5px)", backgroundSize: "20px 20px" }} 
          />
          {/* Decorative Dot Grid (Bottom Right) */}
          <div 
            className="absolute -bottom-10 -right-4 sm:-right-4 w-40 h-40 text-primary opacity-20 pointer-events-none hidden sm:block" 
            style={{ backgroundImage: "radial-gradient(circle, currentColor 2px, transparent 2.5px)", backgroundSize: "20px 20px" }} 
          />

          {/* Main Image Container */}
          <div className="relative w-full max-w-[280px] sm:max-w-[460px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-[var(--shadow-card)] z-10 mx-auto lg:ml-auto lg:mr-0">
             <Image
                src="/care2training/assets/about.KWabaQlx_ad538549ec.jpg"
                alt={t("aboutPreview.title")}
                fill
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="w-full flex flex-col items-center gap-4 mt-6 lg:mt-0 lg:block">
            {/* Top Floating Card - Accommodation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative lg:absolute lg:top-12 lg:-left-12 p-4 sm:p-5 glass-panel rounded-[20px] w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[260px] flex gap-4 items-start z-20 shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#e8f0fe] text-[#1967d2] dark:bg-blue-500/20 dark:text-blue-300 flex items-center justify-center shrink-0">
                <Home size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1 text-sm sm:text-base">{t("aboutPreview.accommodation")}</h4>
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">{t("aboutPreview.accommodationDesc")}</p>
              </div>
            </motion.div>

            {/* Bottom Floating Card - Career Counselling */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative lg:absolute lg:bottom-16 lg:-right-8 p-4 sm:p-5 glass-panel rounded-[20px] w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[260px] flex gap-4 items-start z-20 shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f3e8fd] text-[#7a1abf] dark:bg-purple-500/20 dark:text-purple-300 flex items-center justify-center shrink-0">
                <GraduationCap size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1 text-sm sm:text-base">{t("aboutPreview.careerCounselling")}</h4>
                <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">{t("aboutPreview.careerCounsellingDesc")}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right side: Text and CTA */}
        <div className="order-1 lg:order-2 grid gap-6 relative z-10 px-4 sm:px-0">
           <div>
             <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-3">
               {t("aboutPreview.subtitle")}
             </h3>
             <h2 className="font-display text-3xl font-bold tracking-[-0.04em] text-foreground md:text-4xl lg:text-[2.6rem] leading-[1.15]">
               {t("aboutPreview.title")}
             </h2>
           </div>
           
           <div className="space-y-4 text-[0.95rem] md:text-[1rem] text-muted-foreground leading-relaxed max-w-[65ch]">
             <p>{t("aboutPreview.p1")}</p>
             <p>{t("aboutPreview.p2")}</p>
             <p>{t("aboutPreview.p3")}</p>
           </div>

           <div className="pt-4">
             <LocaleLink
                href="/book-appointment"
                className="inline-flex h-12 md:h-14 items-center justify-center rounded-full border border-border bg-background px-8 md:px-10 font-montserrat font-bold text-foreground hover:border-primary hover:text-primary transition-colors shadow-sm"
             >
               {t("site.cta.bookAppointment")}
             </LocaleLink>
           </div>
        </div>
      </div>
    </section>
  );
}
