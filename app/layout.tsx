import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { config, initContentTypeRegistry, initDisplayTemplateRegistry } from "@optimizely/cms-sdk";
import { initReactComponentRegistry } from "@optimizely/cms-sdk/react/server";
import CmsSiteNav from "@/components/CmsSiteNav";
import { fetchMasterNav } from "@/lib/cms";
import "./globals.css";

// CMS content type registrations
import { HeroCarousel as HeroCarouselType } from "@/cms/content-types/HeroCarousel";
import { HeroSlideItem as HeroSlideItemType } from "@/cms/content-types/HeroSlideItem";
import { OfferCard as OfferCardType } from "@/cms/content-types/OfferCard";
import { OfferEntity as OfferEntityType } from "@/cms/content-types/OfferEntity";
import { OfferEntityV2 as OfferEntityV2Type } from "@/cms/content-types/OfferEntityV2";
import { OmniLandingPage as OmniLandingPageType } from "@/cms/content-types/OmniLandingPage";
import { Paragraph as ParagraphType } from "@/cms/content-types/Paragraph";
import { DefaultParagraph } from "@/cms/display-templates/DefaultParagraph";
import { RestaurantDetail as RestaurantDetailType } from "@/cms/content-types/RestaurantDetail";
import { RestaurantEntity as RestaurantEntityType } from "@/cms/content-types/RestaurantEntity";
import { TaxonomyItem as TaxonomyItemType } from "@/cms/content-types/TaxonomyItem";

// React component registrations
import HeroCarouselComponent from "@/components/HeroCarousel";
import HeroSlideItemComponent from "@/components/HeroSlideItem";
import { OfferCard as OfferCardComponent } from "@/components/OfferCard";
import { OfferCardV2 } from "@/components/OfferCardv2";
import OfferEntityCard from "@/components/OfferEntityCard";
import OmniLandingPageComponent from "@/components/OmniLandingPage";
import ParagraphComponent from "@/components/Paragraph";
import RestaurantDetailComponent from "@/components/RestaurantDetail";
import RestaurantDetailPageComponent from "@/components/RestaurantDetailPage";

config({
  apiKey: process.env.OPTIMIZELY_GRAPH_SINGLE_KEY!,
  graphUrl: process.env.OPTIMIZELY_GRAPH_GATEWAY || undefined,
});

initContentTypeRegistry([
  HeroCarouselType,
  HeroSlideItemType,
  OfferCardType,
  OfferEntityType,
  OfferEntityV2Type,
  OmniLandingPageType,
  ParagraphType,
  RestaurantDetailType,
  RestaurantEntityType,
  TaxonomyItemType,
]);

initDisplayTemplateRegistry([DefaultParagraph]);

initReactComponentRegistry({
  resolver: {
    HeroCarousel: HeroCarouselComponent,
    HeroSlideItem: HeroSlideItemComponent,
    OfferCard: OfferCardComponent,
    OfferEntity: OfferEntityCard,
    OfferEntityV2: OfferCardV2,
    OmniLandingPage: OmniLandingPageComponent,
    Paragraph: ParagraphComponent,
    RestaurantDetail: RestaurantDetailPageComponent,
    RestaurantEntity: RestaurantDetailComponent,
  },
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omni PGA Frisco · Resort & Dining",
  description: "Championship golf, signature dining, and Texan luxury in Frisco, Texas.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nav = await fetchMasterNav();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505]">
        <CmsSiteNav nav={nav} />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
