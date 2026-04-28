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
      <SiteHeader />
      <AutoLeadCaptureModal />
      {children}
      <SiteFooter />
    </NextIntlClientProvider>
  );
}

