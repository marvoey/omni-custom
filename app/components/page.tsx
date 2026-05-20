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
    buttonLink: '#',
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
  ctaUrl: '#',
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
    badgeLabel: 'Exclusive Offer',
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
      'Start your morning right with a fresh, chef-prepared breakfast for two in our signature restaurant.',
    badgeLabel: 'Best Value',
    cardImage:
      'https://omni.optimarvin.com/globalassets/brand-dining-family-2.jpg',
    ctaLabel: 'Learn More',
    ctaUrl: '#',
    bookingWindow: 'Ongoing',
    stayWindow: 'Ongoing',
    offerCode: 'BNB',
    primaryCategory: 'Packages',
  },
  {
    offerTitle: 'Golf & Spa Weekend Getaway',
    teaser:
      'Enjoy a weekend combining the best of our championship courses and world-class spa.',
    badgeLabel: 'Member Only',
    cardImage:
      'https://omni.optimarvin.com/globalassets/san-francisco--sfodtn-montes-restaurant.jpg',
    ctaLabel: 'Reserve Now',
    ctaUrl: '#',
    bookingWindow: 'Now – Dec 20, 2026',
    stayWindow: 'Valid Weekends Thru Dec',
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

function SectionLabel({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-20 pb-8">
      <p className="text-amber-600 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
        {kicker}
      </p>
      <h2 className="text-3xl md:text-4xl font-serif font-bold border-b border-gray-200 pb-4">
        {title}
      </h2>
    </div>
  );
}

export default function ComponentLibraryPage() {
  return (
    <main className="bg-[#fafafa] min-h-screen">
      <SectionLabel kicker="01 — Hero Carousel" title="HeroCarousel" />
      <section className="max-w-6xl mx-auto px-6">
        <HeroCarousel slides={carouselSlides} interval={6000} />
      </section>

      <SectionLabel kicker="02 — Hero Slide" title="HeroSlideItem (static)" />
      <section className="max-w-6xl mx-auto px-6">
        <HeroSlideItem
          heading="Trick Rider Frisco"
          description="An upscale steakhouse honoring the legendary trick riders of Texas."
          backgroundImage="https://omni.optimarvin.com/globalassets/fort-worth--ftwdtn-couple-dining-2800x1180.jpg"
          buttonLink="/restaurant"
          buttonText="View Restaurant"
        />
      </section>

      <SectionLabel kicker="03 — Featured Offer" title="OfferCard · Featured" />
      <section className="max-w-6xl mx-auto px-6">
        <OfferCard layout="featured" theme="light" targetOffer={featuredOffer} />
      </section>

      <SectionLabel kicker="04 — Offer Grid" title="OfferCard · Standard" />
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {standardOffers.map((offer, i) => (
          <OfferCard
            key={offer.offerCode}
            layout="standard"
            theme={i % 2 === 0 ? 'dark' : 'light'}
            targetOffer={offer}
          />
        ))}
      </section>

      <SectionLabel kicker="05 — Restaurant Detail" title="RestaurantDetail" />
      <RestaurantDetail content={restaurantContent} />

      <footer className="py-12 text-center text-[10px] uppercase tracking-[0.3em] text-gray-400">
        Omni Hotels &amp; Resorts · Component Library
      </footer>
    </main>
  );
}
