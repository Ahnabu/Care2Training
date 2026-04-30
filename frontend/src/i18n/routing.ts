export const locales = ["en", "bn", "it", "fr", "es", "de", "bg", "et"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";

