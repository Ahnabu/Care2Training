"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { defaultLocale, locales, type AppLocale } from "@/i18n/routing";

function getLocaleFromPathname(pathname: string | null | undefined) {
  const first = (pathname || "/").split("/")[1];
  return (locales as readonly string[]).includes(first) ? (first as AppLocale) : defaultLocale;
}

function withLocalePrefix(href: string, locale: AppLocale) {
  const localeGroup = locales.join("|");
  const localePrefixPattern = new RegExp(`^\\/(${localeGroup})(\\/|$)`);

  // Already prefixed
  if (localePrefixPattern.test(href)) return href;
  if (href === "/") return `/${locale}`;
  if (!href.startsWith("/")) href = `/${href}`;
  return `/${locale}${href}`;
}

export function LocaleLink({
  href,
  children,
  ...rest
}: Readonly<{
  href: string;
  children: React.ReactNode;
}> &
  Omit<React.ComponentProps<typeof Link>, "href" | "children">) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const prefixedHref = withLocalePrefix(href, locale);

  return (
    <Link href={prefixedHref} {...rest}>
      {children}
    </Link>
  );
}

