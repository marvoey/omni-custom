import HeroSlideItem from '@/components/HeroSlideItem';

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

      <footer className="py-12 text-center text-[10px] uppercase tracking-[0.3em] text-gray-400">
        Omni Hotels &amp; Resorts · Component Library
      </footer>
    </main>
  );
}
