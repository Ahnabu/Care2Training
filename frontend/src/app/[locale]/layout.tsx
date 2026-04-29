import "../globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales, type AppLocale } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { AutoLeadCaptureModal } from "@/components/lead/AutoLeadCaptureModal";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: candidate } = await params;
  const locale = (locales as readonly string[]).includes(candidate) ? (candidate as AppLocale) : ("en" as AppLocale);

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:border focus:border-border"
      >
        Skip to content
      </a>
      <SiteHeader />
      <AutoLeadCaptureModal />
      <div id="content" tabIndex={-1}>
        {children}
      </div>
      <SiteFooter />
    </NextIntlClientProvider>
  );
}

