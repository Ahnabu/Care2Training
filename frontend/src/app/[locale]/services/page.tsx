import { getTranslations } from "next-intl/server";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServicesBentoGrid } from "@/components/sections/ServicesBentoGrid";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTABand } from "@/components/sections/CTABand";
import { TrustBar } from "@/components/sections/TrustBar";
import { OfficesMini } from "@/components/sections/OfficesMini";
import { PageHeader } from "@/components/layout/PageHeader";
import { fetchServices } from "@/lib/servicesApi";

type Props = Readonly<{ params: Promise<{ locale: string }> }>;

export default async function LocaleServicesPage({ params }: Props) {
	const { locale } = await params;
	const tNav = await getTranslations("nav");
	const tPage = await getTranslations("studyDestinationsPage");
	const services = await fetchServices(locale);

	return (
		<main className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-12 py-12 md:py-16">
			<PageHeader
				title={tNav("services")}
				description="Clear guidance at every step - from choosing a destination to preparing your application."
			/>

			<div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-start">
				<TrustBar />
				<OfficesMini className="lg:mt-1" />
			</div>

			<ServicesBentoGrid
				showHeading={false}
				className="mt-10 py-0 md:py-0"
				services={services}
				labels={{ viewDetails: tPage("viewDetails") }}
			/>

			<ProcessSteps />
			<TestimonialsSection />
			<FAQAccordion />
			<CTABand />
		</main>
	);
}

