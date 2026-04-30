"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { LocaleLink } from "@/components/i18n/LocaleLink";
import { motion } from "framer-motion";
import { GraduationCap, Home } from "lucide-react";

export function AboutPreviewSection() {
  const t = useTranslations();

  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
        {/* Left side: Image and Floating Cards */}
        <div className="relative order-2 lg:order-1 flex flex-col items-center lg:block mt-8 lg:mt-0 lg:pr-8">
          
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
          <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl z-10 mx-auto lg:ml-auto lg:mr-10">
            <Image
               src="/care2training/assets/about.KWabaQlx_ad538549ec.jpg"
               alt={t("aboutPreview.title")}
               fill
               sizes="(max-width: 1024px) 100vw, 460px"
               className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          </div>

          <div className="w-full flex flex-col items-center gap-6 mt-8 lg:mt-0 lg:block lg:absolute lg:inset-0 lg:pointer-events-none z-20">
            {/* Top Floating Card - Accommodation */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:pointer-events-auto relative lg:absolute lg:top-[5%] lg:left-0 xl:left-[2%] p-5 rounded-[20px] w-full max-w-[320px] flex gap-4 items-start bg-background border border-border/50 shadow-xl dark:bg-[#1e2333]/95 dark:border-white/5 dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-full bg-[#e8f0fe] text-[#1967d2] dark:bg-[#2a365c] dark:text-[#60a5fa] flex items-center justify-center shrink-0">
                <Home size={22} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-foreground text-[15px] mb-1">{t("aboutPreview.accommodation")}</h4>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{t("aboutPreview.accommodationDesc")}</p>
              </div>
            </motion.div>

            {/* Bottom Floating Card - Career Counselling */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:pointer-events-auto relative lg:absolute lg:bottom-[10%] lg:-right-[5%] xl:-right-[8%] p-5 rounded-[20px] w-full max-w-[320px] flex gap-4 items-start bg-background border border-border/50 shadow-xl dark:bg-[#1e2333]/95 dark:border-white/5 dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-full bg-[#f3e8fd] text-[#7a1abf] dark:bg-[#3b2559] dark:text-[#c084fc] flex items-center justify-center shrink-0">
                <GraduationCap size={22} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-foreground text-[15px] mb-1">{t("aboutPreview.careerCounselling")}</h4>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{t("aboutPreview.careerCounsellingDesc")}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right side: Text and CTA */}
        <div className="order-1 lg:order-2 grid gap-6 relative z-10 px-4 sm:px-0">
           <div>
             <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground mb-3">
               {t("aboutPreview.subtitle")}
             </h3>
             <h2 className="font-display text-[2rem] sm:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-foreground leading-[1.1]">
               {t("aboutPreview.title")}
             </h2>
           </div>
           
           <div className="space-y-5 text-[0.95rem] md:text-[1.05rem] text-muted-foreground leading-relaxed max-w-[65ch]">
             <p>{t("aboutPreview.p1")}</p>
             <p>{t("aboutPreview.p2")}</p>
             <p>{t("aboutPreview.p3")}</p>
           </div>

           <div className="pt-4">
             <LocaleLink
                href="/book-appointment"
                className="inline-flex h-12 md:h-14 items-center justify-center rounded-full border border-primary/50 text-primary bg-transparent px-8 md:px-10 font-semibold hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
             >
               {t("site.cta.bookAppointment")}
             </LocaleLink>
           </div>
        </div>
      </div>
    </section>
  );
}
