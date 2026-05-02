import { StudyDestinationsListingPage } from "@/components/study-destinations/StudyDestinationsListingPage";

type Props = Readonly<{ params: Promise<{ locale: string }> }>;

export default async function LocaleStudyDestinationsPage({ params }: Props) {
	const { locale } = await params;
	return <StudyDestinationsListingPage locale={locale} />;
}

