"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LocaleLink } from "@/components/i18n/LocaleLink";

export function GetToKnowAboutUsSection() {
  const t = useTranslations();

  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24 items-center">
        
        {/* Left Column - Content */}
        <div className="grid gap-6 relative z-10 px-1 sm:px-0 lg:pr-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <p className="text-sm md:text-base font-semibold uppercase tracking-[0.1em] text-foreground">
                GET TO KNOW ABOUT US
              </p>
            </div>
            
            {/* Custom underline with circle */}
            <div className="flex items-center w-full max-w-[140px] -mt-2">
              <div className="h-[2px] w-10 bg-primary" />
              <div className="h-2.5 w-2.5 rounded-full border-2 border-primary bg-background mx-1" />
              <div className="h-[2px] flex-1 bg-primary" />
            </div>

            <h2 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-medium tracking-tight text-primary leading-[1.1] pt-2">
              Care2 Training
            </h2>
          </div>

          <div className="space-y-6 text-[1rem] md:text-[1.1rem] text-muted-foreground leading-relaxed mt-4 max-w-[65ch]">
            <p>{t.rich("getToKnowAboutUs.p1", { bold: (chunks) => <strong className="font-bold text-foreground">{chunks}</strong> })}</p>
            <p>{t.rich("getToKnowAboutUs.p2", { bold: (chunks) => <strong className="font-bold text-foreground">{chunks}</strong> })}</p>
            <p>{t.rich("getToKnowAboutUs.p3", { bold: (chunks) => <strong className="font-bold text-foreground">{chunks}</strong> })}</p>
          </div>
          
          <div className="pt-4">
            <LocaleLink
              href="/book-appointment"
              className="inline-flex h-12 md:h-14 items-center justify-center rounded-full bg-primary px-8 md:px-10 font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            >
              {t("site.cta.bookAppointment")}
            </LocaleLink>
          </div>
        </div>

        {/* Right Column - Images */}
        <div className="relative isolate mt-12 lg:mt-0 w-full aspect-square md:aspect-[4/3] lg:aspect-auto lg:h-[600px] xl:h-[650px] lg:pl-10">
          <div className="relative w-full h-full max-w-[500px] lg:max-w-none mx-auto">
            {/* Background image (Trophy) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="absolute left-0 bottom-0 lg:bottom-[5%] w-[70%] h-[65%] lg:h-[70%] rounded-xl overflow-hidden border-[6px] border-background shadow-2xl z-10"
            >
              <Image
                src="/care2training/assets/about_trophy.jpg"
                alt="Care2 Training Experience"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 65vw, 40vw"
              />
            </motion.div>

            {/* Foreground image (Man) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="absolute right-0 top-0 w-[60%] h-[75%] lg:h-[80%] rounded-xl overflow-hidden border-[6px] border-background shadow-2xl z-20 bg-muted/20"
            >
              <div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-primary/10 to-transparent z-10 pointer-events-none" />
              <Image
                src="/care2training/assets/about_man.png"
                alt="Care2 Training Expert"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 55vw, 35vw"
              />
            </motion.div>

            {/* Logo floating box */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute top-[8%] lg:top-[12%] left-[2%] z-30 bg-background rounded-xl shadow-xl p-3 md:p-5 lg:p-6 border border-border/40"
            >
              <div className="relative w-24 h-12 md:w-28 md:h-14 lg:w-32 lg:h-16">
                <Image
                  src="/care2training/assets/logo2.jpeg"
                  alt="Care2 Training Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Experience floating box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="absolute bottom-[8%] lg:bottom-[15%] right-[5%] md:right-[15%] lg:-right-[5%] z-30 bg-background shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] p-4 md:p-6 flex items-center gap-4 lg:gap-5 border-l-[6px] border-l-primary"
            >
               <div className="absolute -left-[12px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-r-[12px] border-r-primary" />
               
               <div className="text-primary font-display text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-bold leading-none tracking-tight">
                 {t("aboutPreview.experience")}
               </div>
               <div className="text-foreground font-semibold text-sm md:text-base lg:text-[1.1rem] leading-[1.1] max-w-[120px]">
                 {t("aboutPreview.experienceText")}
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
