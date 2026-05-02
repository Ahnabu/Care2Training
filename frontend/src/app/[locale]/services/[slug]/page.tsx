import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES, getServiceBySlug } from "@/content/services";
import { ServiceDetailContent } from "@/components/services/ServiceDetailContent";
import { locales } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    SERVICES.map((s) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = getServiceBySlug(slug);
  if (!svc) return { title: "Service | Care2 Training" };
  return {
    title: svc.metaTitle,
    description: svc.metaDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  return <ServiceDetailContent service={service} />;
}
