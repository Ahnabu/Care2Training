import { HomeHero } from "@/components/home/HomeHero";

type Props = { params: Promise<{ locale: string }> };

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params;
  return <HomeHero locale={locale} />;
}
