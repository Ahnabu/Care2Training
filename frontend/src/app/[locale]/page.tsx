import { HomeHero } from "@/components/home/HomeHero";

export default function LocaleHomePage({ params }: Readonly<{ params: { locale: string } }>) {
  return <HomeHero locale={params.locale} />;
}

