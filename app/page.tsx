import Link from 'next/link';
import { ContentProps } from '@optimizely/cms-sdk';
import HeroCarousel from '@/components/HeroCarousel';
import HeroSlideItem from '@/components/HeroSlideItem';
import { OfferCard } from '@/components/OfferCard';
import RestaurantDetail from '@/components/RestaurantDetail';
import { fetchOffers, fetchRestaurant } from '@/lib/cms';
import { RestaurantEntity } from '@/cms/content-types/RestaurantEntity';

function SectionHeader({
  kicker,
  title,
  subtitle,
  light = false,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl mx-auto px-6 text-center mb-16">
      <p
        className={`text-[10px] font-bold uppercase tracking-[0.4em] mb-4 ${
          light ? 'text-amber-700' : 'text-amber-500'
        }`}
      >
        {kicker}
      </p>
      <h2
        className={`text-4xl md:text-5xl font-bold uppercase tracking-tighter ${
          light ? 'text-stone-900' : 'text-white'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-6 text-lg font-light leading-relaxed ${
            light ? 'text-stone-600' : 'text-gray-400'
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-8 mx-auto w-12 h-[1px] ${
          light ? 'bg-amber-700' : 'bg-amber-600'
        }`}
      />
    </div>
  );
}

export default async function HomePage() {
  // Fetch data from CMS
  const cmsOffers = await fetchOffers();
  const cmsRestaurant = await fetchRestaurant();

  // Map CMS offers to carousel slides and offer cards
  const carouselSlides = cmsOffers.slice(0, 3).map((offer) => ({
    heading: offer.offerTitle || 'Special Offer',
    description: offer.shortTeaser || '',
    backgroundImage: offer.cardImage?.url?.default || 'https://omni.optimarvin.com/globalassets/fort-worth--ftwdtn-couple-dining-2800x1180.jpg',
    buttonLink: '/restaurant',
    buttonText: offer.ctaLabel || 'Learn More',
  }));

  // Use first offer as featured, rest as standard
  const featuredOffer = cmsOffers[0]
    ? {
        offerTitle: cmsOffers[0].offerTitle || '',
        teaser: cmsOffers[0].shortTeaser || '',
        badgeLabel: cmsOffers[0].badge || undefined,
        cardImage: cmsOffers[0].cardImage?.url?.default || '',
        ctaLabel: cmsOffers[0].ctaLabel || 'Learn More',
        ctaUrl: '/restaurant',
        bookingWindow: cmsOffers[0].bookingWindow || '',
        stayWindow: cmsOffers[0].stayWindow || '',
        offerCode: cmsOffers[0].OfferCode || undefined,
        primaryCategory: 'Featured',
      }
    : {
        offerTitle: 'Equestrian Elegance and Private Dining',
        teaser: 'Immerse yourself in the spirit of the West with an exclusive dinner at Trick Rider, followed by a luxury weekend stay in our premier ranch suites.',
        badgeLabel: 'Flash Sale',
        cardImage: 'https://omni.optimarvin.com/globalassets/fort-worth--ftwdtn-couple-dining-2800x1180.jpg',
        ctaLabel: 'Reserve Your Suite',
        ctaUrl: '/restaurant',
        bookingWindow: 'May 20 – June 15, 2026',
        stayWindow: 'June 1 – Aug 31, 2026',
        offerCode: 'TRICK26',
        primaryCategory: 'Culinary',
      };

  const standardOffers = cmsOffers.slice(1, 4).map((offer) => ({
    offerTitle: offer.offerTitle || '',
    teaser: offer.shortTeaser || '',
    badgeLabel: offer.badge || undefined,
    cardImage: offer.cardImage?.url?.default || '',
    ctaLabel: offer.ctaLabel || 'Learn More',
    ctaUrl: '#',
    bookingWindow: offer.bookingWindow || '',
    stayWindow: offer.stayWindow || '',
    offerCode: offer.OfferCode || undefined,
    primaryCategory: 'Special Offers',
  }));

  return (
    <>
      {/* HERO CAROUSEL */}
      <section className="w-full">
        <HeroCarousel slides={carouselSlides.length > 0 ? carouselSlides : [
          {
            heading: 'Escape to Omni PGA Frisco',
            description: 'Championship golf and Texan luxury at the heart of Frisco.',
            backgroundImage: 'https://omni.optimarvin.com/globalassets/fort-worth--ftwdtn-couple-dining-2800x1180.jpg',
            buttonLink: '/restaurant',
            buttonText: 'Discover Dining',
          },
        ]} interval={6500} />
      </section>

      {/* INTRO */}
      <section className="bg-[#050505] py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">
            Welcome
          </p>
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white leading-[0.95] mb-8">
            A Resort for the{' '}
            <span className="text-amber-500 italic">Modern Texan</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
            From championship golf and signature dining to private retreats and
            curated experiences, Omni PGA Frisco is the new pulse of luxury in
            North Texas.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/restaurant"
              className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 font-bold uppercase tracking-[0.25em] text-xs transition-all duration-300 shadow-[0_10px_30px_rgba(217,119,6,0.2)]"
            >
              Explore Dining
            </Link>
            <Link
              href="#offers"
              className="border border-white/30 hover:border-amber-500 hover:text-amber-500 text-white px-10 py-4 font-bold uppercase tracking-[0.25em] text-xs transition-colors"
            >
              View Offers
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED OFFER */}
      <section id="offers" className="bg-[#fafafa] py-24">
        <SectionHeader
          kicker="Featured"
          title="This Season at Frisco"
          subtitle="Hand-picked packages combining dining, golf, and stays."
          light
        />
        <div className="max-w-6xl mx-auto px-6">
          <OfferCard layout="featured" theme="light" targetOffer={featuredOffer} />
        </div>
      </section>

      {/* OFFER GRID */}
      <section className="bg-[#050505] py-24">
        <SectionHeader
          kicker="More Ways to Stay"
          title="Curated Packages"
          subtitle="Explore additional offers crafted around our resort experiences."
        />
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {standardOffers.map((offer, i) => (
            <OfferCard
              key={offer.offerCode}
              layout="standard"
              theme={i % 2 === 0 ? 'dark' : 'light'}
              targetOffer={offer}
            />
          ))}
        </div>
      </section>

      {/* RESTAURANT SPOTLIGHT */}
      <section className="bg-[#0a0a0a]">
        <SectionHeader
          kicker="Dining"
          title={`Spotlight: ${cmsRestaurant?.restaurantName || 'Trick Rider'}`}
          subtitle={cmsRestaurant?.cuisine || 'Texan heritage reimagined as upscale steak and seafood.'}
        />
        <div className="max-w-6xl mx-auto px-6 pb-24">
          <HeroSlideItem
            heading={cmsRestaurant?.overview || 'An Upscale Homage to Texas'}
            description={cmsRestaurant?.overview || 'Signature steaks, premium seafood, and a horse-shoe shaped bar at the heart of Frisco\'s evening scene.'}
            backgroundImage={cmsRestaurant?.heroImage?.url?.default || 'https://omni.optimarvin.com/globalassets/fort-worth--ftwdtn-couple-dining-2800x1180.jpg'}
            buttonLink="/restaurant"
            buttonText="View Restaurant"
          />
        </div>
      </section>

      {/* RESTAURANT DETAIL EMBED */}
      {cmsRestaurant && (
        <section>
          <SectionHeader
            kicker="Editorial Preview"
            title="A Closer Look"
            subtitle="The full editorial layout you'll see on the Trick Rider page."
          />
          <RestaurantDetail content={cmsRestaurant as unknown as ContentProps<typeof RestaurantEntity>} />
        </section>
      )}

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
          <div className="w-12 h-[1px] bg-amber-600" />
          <p className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.4em]">
            Omni PGA Frisco
          </p>
          <nav className="flex flex-wrap gap-10 justify-center">
            <Link
              href="/"
              className="text-gray-500 hover:text-amber-500 text-[10px] uppercase tracking-[0.3em] font-bold transition-colors"
            >
              Home
            </Link>
            <Link
              href="/restaurant"
              className="text-gray-500 hover:text-amber-500 text-[10px] uppercase tracking-[0.3em] font-bold transition-colors"
            >
              Trick Rider
            </Link>
            <Link
              href="/restaurant2"
              className="text-gray-500 hover:text-amber-500 text-[10px] uppercase tracking-[0.3em] font-bold transition-colors"
            >
              Editorial
            </Link>
          </nav>
          <p className="text-gray-600 text-[9px] uppercase tracking-[0.4em]">
            &copy; 2026 Omni Hotels &amp; Resorts
          </p>
        </div>
      </footer>
    </>
  );
}
