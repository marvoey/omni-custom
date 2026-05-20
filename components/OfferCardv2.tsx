import React from 'react';
import Head from 'next/head';
 
/**
* OfferCardV2 Component
* Renders the Omni Hospitality OfferEntityV2 structured content.
*/
const OfferCardV2 = ({
  badge = "Flash Sale",
  bookingWindow = "May 20 - June 15, 2026",
  cardImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
  ctaLabel = "Reserve Your Suite",
  ctaUrl = "#",
  offerTitle = "Equestrian Elegance and Private Dining",
  primaryCategory = "Culinary",
  shortTeaser = "Immerse yourself in the spirit of the West with an exclusive dinner at Trick Rider, followed by a luxury weekend stay in our premier ranch suites.",
  stayWindow = "June 1 - Aug 31, 2026",
  targetProperty = "Omni Trick Rider"
}) => {
  return (
<div className="max-w-md mx-auto bg-white border border-gray-100 rounded-sm shadow-xl overflow-hidden group transition-all duration-300 hover:-translate-y-1">
      {/* Image Container with Badge */}
<div className="relative h-60 w-full overflow-hidden">
<img 
          src={cardImage} 
          alt={offerTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {badge && (
<div className="absolute top-4 left-4 bg-[#c5a059] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            {badge}
</div>
        )}
</div>
 
      {/* Content Body */}
<div className="p-8 font-sans">
<div className="flex items-center gap-2 mb-3 text-[10px] uppercase tracking-[0.2em] font-bold text-[#c5a059]">
<span>{primaryCategory}</span>
<span className="text-gray-300">•</span>
<span>{targetProperty}</span>
</div>
 
        <h2 className="text-2xl text-[#1a1a1a] leading-tight mb-4 tracking-tight" style={{ fontFamily: 'serif' }}>
          {offerTitle}
</h2>
 
        <p className="text-sm leading-relaxed text-gray-600 mb-6 font-light antialiased">
          {shortTeaser}
</p>
 
        {/* Temporal Data Grid */}
<div className="grid grid-cols-2 gap-4 pt-5 mb-8 border-t border-gray-100">
<div className="flex flex-col">
<span className="text-[9px] uppercase tracking-wider font-extrabold text-[#8e7341] mb-1">
              Booking Window
</span>
<span className="text-[11px] text-gray-400 font-medium">{bookingWindow}</span>
</div>
<div className="flex flex-col">
<span className="text-[9px] uppercase tracking-wider font-extrabold text-[#8e7341] mb-1">
              Stay Window
</span>
<span className="text-[11px] text-gray-400 font-medium">{stayWindow}</span>
</div>
</div>
 
        {/* Global CTA */}
<div className="flex justify-center">
<a
            href={ctaUrl}
            className="inline-block w-full text-center bg-[#1a1a1a] hover:bg-[#c5a059] text-white text-[11px] font-bold uppercase tracking-[0.2em] py-4 transition-all duration-300 shadow-md"
>
            {ctaLabel}
</a>
</div>
</div>
</div>
  );
};
 
export default function OmniPreviewPage() {
  const fontUrl = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Montserrat:wght@400;700&family=Lato:wght@300;400&display=swap%22";
  return (
<div className="min-h-screen bg-[#fafafa] py-16 px-6">
<Head>
<title>Omni Hospitality | Component Library</title>
<link href={fontUrl} rel="stylesheet" />
<script src="https://cdn.tailwindcss.com"></script>
<style dangerouslySetInnerHTML={{ __html: `
          body { font-family: 'Lato', sans-serif; }
          h2 { font-family: 'Playfair Display', serif; }
        `}} />
</Head>
 
      <div className="max-w-4xl mx-auto space-y-12">
<div className="border-b border-gray-200 pb-8 text-center uppercase tracking-widest">
<p className="text-[#c5a059] text-[10px] font-bold mb-2">Omni Hotels &amp; Resorts</p>
<h1 className="text-3xl font-serif text-[#1a1a1a]" style={{ fontFamily: 'serif' }}>OfferEntityV2 Framework</h1>
<p className="max-w-md mx-auto mt-4 text-sm text-gray-400 leading-relaxed italic lowercase">
              Visualizing structured CMS data within a modern Next.js headless environment.
</p>
</div>
 
        <section className="flex justify-center py-8">
<OfferCardV2 />
</section>
 
        <footer className="pt-8 text-center">
<div className="inline-flex gap-4 p-2 bg-gray-100 rounded-full px-4">
<span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Resort Context: Trick Rider</span>
<span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Locale: EN-US</span>
</div>
</footer>
</div>
</div>
  );
}