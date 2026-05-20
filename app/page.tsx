import Link from 'next/link';
import HeroCarousel from '@/components/HeroCarousel';
import HeroSlideItem from '@/components/HeroSlideItem';
import { OfferCard } from '@/components/OfferCard';
import RestaurantDetail from '@/components/RestaurantDetail';

const carouselSlides = [
  {
    heading: 'Escape to Omni PGA Frisco',
    description: 'Championship golf and Texan luxury at the heart of Frisco.',
    backgroundImage:
      'https://omni.optimarvin.com/globalassets/fort-worth--ftwdtn-couple-dining-2800x1180.jpg',
    buttonLink: '/restaurant',
    buttonText: 'Discover Dining',
  },
  {
    heading: 'Signature Steak & Seafood',
    description: 'Dine at Trick Rider — an upscale homage to the Lone Star State.',
    backgroundImage:
      'https://omni.optimarvin.com/globalassets/san-francisco--sfodtn-montes-restaurant.jpg',
    buttonLink: '/restaurant2',
    buttonText: 'Reserve a Table',
  },
  {
    heading: 'Family Moments, Reimagined',
    description: 'Curated experiences and dining for every generation.',
    backgroundImage:
      'https://omni.optimarvin.com/globalassets/brand-dining-family-2.jpg',
    buttonLink: '#offers',
    buttonText: 'Explore Packages',
  },
];

const featuredOffer = {
  offerTitle: 'Equestrian Elegance and Private Dining',
  teaser:
    'Immerse yourself in the spirit of the West with an exclusive dinner at Trick Rider, followed by a luxury weekend stay in our premier ranch suites.',
  badgeLabel: 'Flash Sale',
  cardImage:
    'https://omni.optimarvin.com/globalassets/fort-worth--ftwdtn-couple-dining-2800x1180.jpg',
  ctaLabel: 'Reserve Your Suite',
  ctaUrl: '/restaurant',
  bookingWindow: 'May 20 – June 15, 2026',
  stayWindow: 'June 1 – Aug 31, 2026',
  offerCode: 'TRICK26',
  primaryCategory: 'Culinary',
};

const standardOffers = [
  {
    offerTitle: 'Summer Getaway: $50 Daily Credit',
    teaser:
      'Book your resort escape and receive a daily credit for dining, spa, and more.',
    badgeLabel: 'Exclusive',
    cardImage:
      'https://omni.optimarvin.com/globalassets/fort-worth--ftwdtn-couple-dining-2800x1180.jpg',
    ctaLabel: 'View Details',
    ctaUrl: '#',
    bookingWindow: 'Now – May 31, 2026',
    stayWindow: 'Stay Through Sept 30',
    offerCode: 'SUMMER26',
    primaryCategory: 'Special Offers',
  },
  {
    offerTitle: 'Bed & Breakfast Package',
    teaser:
      'Chef-prepared breakfast for two each morning in our signature restaurant.',
    badgeLabel: 'Best Value',
    cardImage:
      'https://omni.optimarvin.com/globalassets/brand-dining-family-2.jpg',
    ctaLabel: 'Learn More',
    ctaUrl: '#',
    bookingWindow: 'Ongoing',
    stayWindow: 'Year-Round',
    offerCode: 'BNB',
    primaryCategory: 'Packages',
  },
  {
    offerTitle: 'Golf & Spa Weekend',
    teaser:
      'A weekend combining championship golf and our world-class spa.',
    badgeLabel: 'Member Only',
    cardImage:
      'https://omni.optimarvin.com/globalassets/san-francisco--sfodtn-montes-restaurant.jpg',
    ctaLabel: 'Reserve Now',
    ctaUrl: '#',
    bookingWindow: 'Now – Dec 20, 2026',
    stayWindow: 'Weekends Thru Dec',
    offerCode: 'GOLFSPA',
    primaryCategory: 'Resort Activities',
  },
];

const restaurantContent = {
  restaurantName: 'Trick Rider',
  cuisine: 'Signature Steak and Seafood',
  description: `
    <p>Trick Rider pays a spirited tribute to the legendary female trick riders of the rodeo across the Lone Star State. This upscale steakhouse blends authentic rodeo culture with a sophisticated atmosphere, featuring a hand-cut crystal horse chandelier that serves as the room's crown jewel.</p>
    <p>Prepare for a dining experience defined by signature steaks, premium seafood, and a horse-shoe shaped bar that serves as the heart of Frisco's evening scene.</p>
  `,
  heroImage: {
    url: 'https://omni.optimarvin.com/globalassets/fort-worth--ftwdtn-couple-dining-2800x1180.jpg',
    alt: 'Trick Rider dining room',
  },
  hours: 'Dinner: Tue – Sun, 5:00 PM – 10:00 PM\nBar: Tue – Sun, 4:00 PM – 12:00 AM',
  menuLink: {
    url: 'http://menus.omnihotels.com/htmlmenu/omnipgafriscoresort/trickrider',
    title: 'View Digital Menu',
  },
  reservationUrl: 'https://www.opentable.com/r/trick-rider-frisco',
  locationTags: ['Omni PGA Frisco Resort', 'Frisco, Texas'],
};

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

export default function HomePage() {
  return (
    <>
      {/* HERO CAROUSEL */}
      <section className="w-full">
        <HeroCarousel slides={carouselSlides} interval={6500} />
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
          title="Spotlight: Trick Rider"
          subtitle="Texan heritage reimagined as upscale steak and seafood."
        />
        <div className="max-w-6xl mx-auto px-6 pb-24">
          <HeroSlideItem
            heading="An Upscale Homage to Texas"
            description="Signature steaks, premium seafood, and a horse-shoe shaped bar at the heart of Frisco's evening scene."
            backgroundImage="https://omni.optimarvin.com/globalassets/fort-worth--ftwdtn-couple-dining-2800x1180.jpg"
            buttonLink="/restaurant"
            buttonText="View Restaurant"
          />
        </div>
      </section>

      {/* RESTAURANT DETAIL EMBED */}
      <section>
        <SectionHeader
          kicker="Editorial Preview"
          title="A Closer Look"
          subtitle="The full editorial layout you'll see on the Trick Rider page."
        />
        <RestaurantDetail content={restaurantContent} />
      </section>

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
