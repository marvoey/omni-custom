import Link from 'next/link';
import { ContentProps } from '@optimizely/cms-sdk';
import HeroSlideItem from '@/components/HeroSlideItem';
import RestaurantDetail from '@/components/RestaurantDetail';
import { fetchRestaurant } from '@/lib/cms';
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
  const cmsRestaurant = await fetchRestaurant();

  return (
    <>
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
              href="/en/"
              className="border border-white/30 hover:border-amber-500 hover:text-amber-500 text-white px-10 py-4 font-bold uppercase tracking-[0.25em] text-xs transition-colors"
            >
              View Landing Page
            </Link>
          </div>
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
