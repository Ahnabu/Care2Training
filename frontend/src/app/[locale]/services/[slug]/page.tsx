import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES } from "@/content/services";
import { ServiceDetailContent } from "@/components/services/ServiceDetailContent";
import { locales } from "@/i18n/routing";
import { fetchServiceBySlug, fetchServices } from "@/lib/servicesApi";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = true;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    SERVICES.map((s) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const svc = await fetchServiceBySlug(slug, locale);
  if (!svc) return { title: "Service | Care2 Training" };
  return {
    title: svc.metaTitle,
    description: svc.metaDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const service = await fetchServiceBySlug(slug, locale);
  const services = await fetchServices(locale);
  if (!service) notFound();
  return <ServiceDetailContent service={service} locale={locale} services={services} />;
}
