import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales, type AppLocale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const candidate = (await requestLocale) ?? "";
  const locale = (locales as readonly string[]).includes(candidate) ? (candidate as AppLocale) : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

