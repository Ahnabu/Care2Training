import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/content/services";
import { ServiceDetailContent } from "@/components/services/ServiceDetailContent";
import { fetchServiceBySlug, fetchServices } from "@/lib/servicesApi";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = await fetchServiceBySlug(slug, "en");
  if (!svc) return { title: "Service | Care2 Training" };
  return {
    title: svc.metaTitle,
    description: svc.metaDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await fetchServiceBySlug(slug, "en");
  const services = await fetchServices("en");
  if (!service) notFound();
  return <ServiceDetailContent service={service} locale="en" services={services} />;
}
