//Offer Card:
 import React from 'react';
 
/**
* Icons mapped to inline SVGs to ensure zero-dependency 
* compilation in the preview environment.
*/
const Calendar = ({ className }: { className?: string }) => (
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);
 
const ArrowRight = ({ className }: { className?: string }) => (
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
 
const Tag = ({ className }: { className?: string }) => (
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
);
 
/**
* OfferCard Component
* 
* Maps directly to your CMS OfferCard and OfferEntity content types.
*/
interface TargetOffer {
  offerTitle: string;
  teaser: string;
  badgeLabel?: string;
  cardImage: string;
  ctaLabel: string;
  ctaUrl: string;
  bookingWindow?: string;
  stayWindow?: string;
  offerCode?: string;
  primaryCategory?: string;
}

interface OfferCardProps {
  layout?: 'standard' | 'featured';
  theme?: 'dark' | 'light';
  showBadge?: boolean;
  showCategory?: boolean;
  showDates?: boolean;
  targetOffer?: TargetOffer;
}

const OfferCard = ({
  layout = "standard",
  theme = "dark",
  showBadge = true,
  showCategory = true,
  showDates = true,
  targetOffer = {
    offerTitle: "Summer Getaway: $50 Daily Credit",
    teaser: "Book your resort escape and receive a daily credit for dining, spa, and more.",
    badgeLabel: "Exclusive Offer",
    cardImage: "https://omni.optimarvin.com/globalassets/fort-worth--ftwdtn-couple-dining-2800x1180.jpg",
    ctaLabel: "View Details",
    ctaUrl: "#",
    bookingWindow: "Now — May 31, 2026",
    stayWindow: "Stay Through Sept 30",
    offerCode: "SUMMER26",
    primaryCategory: "Special Offers"
  }
}: OfferCardProps) => {
  const isFeatured = layout === "featured";
  const isDark = theme === "dark";
 
  // Light/Dark Theme Logic
  const themeClasses = isDark 
    ? "bg-[#111] text-white border-white/5 hover:border-amber-600/30" 
    : "bg-white text-gray-900 border-gray-100 hover:border-amber-600/30";
 
  if (isFeatured) {
    return (
<div className={`relative border rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl transition-all duration-500 ${themeClasses}`}>
        {showBadge && targetOffer.badgeLabel && (
<div className="absolute top-8 left-8 z-10 bg-black text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2 border-l-4 border-amber-600 shadow-xl">
            {targetOffer.badgeLabel}
</div>
        )}
 
        <div className="md:w-5/12 h-[400px] md:h-auto overflow-hidden">
<img 
            src={targetOffer.cardImage} 
            alt={targetOffer.offerTitle} 
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
          />
</div>
 
        <div className="md:w-7/12 p-10 md:p-16 flex flex-col justify-center space-y-8">
<div className="space-y-4">
            {showCategory && (
<span className={`text-xs uppercase tracking-[0.3em] font-bold ${isDark ? 'text-amber-500' : 'text-amber-700'}`}>
                {targetOffer.primaryCategory}
</span>
            )}
<h3 className="text-4xl md:text-5xl font-serif font-bold leading-tight uppercase tracking-tighter italic">
              {targetOffer.offerTitle}
</h3>
<p className={`text-lg font-light leading-relaxed max-w-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {targetOffer.teaser}
</p>
</div>
 
          {(showDates || targetOffer.offerCode) && (
<div className={`grid grid-cols-2 gap-8 border-y py-8 ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
              {showDates && (
<div>
<span className="block text-[10px] uppercase text-gray-400 tracking-widest mb-1">Booking Window</span>
<span className="text-sm font-semibold">{targetOffer.bookingWindow}</span>
</div>
              )}
              {targetOffer.offerCode && (
<div>
<span className="block text-[10px] uppercase text-gray-400 tracking-widest mb-1 font-bold">Offer Code</span>
<div className="flex items-center space-x-2">
<Tag className="text-amber-600" />
<span className="text-sm font-serif font-bold tracking-widest">{targetOffer.offerCode}</span>
</div>
</div>
              )}
</div>
          )}
 
          <div className="flex flex-col sm:flex-row items-center gap-6">
<button className="w-full sm:w-auto bg-[#da3743] hover:bg-[#c12631] text-white px-10 py-5 font-bold uppercase tracking-widest transition shadow-lg active:scale-95">
              {targetOffer.ctaLabel}
</button>
</div>
</div>
</div>
    );
  }
 
  // Standard Compact Layout
  return (
<div className={`group border rounded-sm overflow-hidden transition-all duration-500 shadow-xl ${themeClasses}`}>
<div className="relative h-64 overflow-hidden">
        {showBadge && targetOffer.badgeLabel && (
<div className="absolute top-4 left-4 z-10 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow-lg">
            {targetOffer.badgeLabel}
</div>
        )}
<img 
          src={targetOffer.cardImage} 
          alt={targetOffer.offerTitle} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
</div>
<div className="p-8 space-y-5">
        {showCategory && (
<span className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold">
            {targetOffer.primaryCategory}
</span>
        )}
<h3 className="text-2xl font-serif font-bold leading-tight min-h-[3.5rem]">
          {targetOffer.offerTitle}
</h3>
<p className={`text-sm font-light leading-relaxed line-clamp-2 italic ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {targetOffer.teaser}
</p>
        {showDates && (
<div className={`pt-4 flex items-center space-x-3 text-[10px] border-t uppercase tracking-widest font-semibold ${isDark ? 'text-gray-500 border-white/10' : 'text-gray-400 border-gray-100'}`}>
<Calendar className="text-amber-600" />
<span>{targetOffer.stayWindow}</span>
</div>
        )}
 
        <div className="pt-2">
<button className={`flex items-center justify-center space-x-3 w-full border font-bold uppercase tracking-[0.2em] text-xs py-4 transition-all duration-300 ${
            isDark 
              ? 'border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-white' 
              : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
          }`}>
<span>{targetOffer.ctaLabel}</span>
<ArrowRight className="w-3 h-3" />
</button>
</div>
</div>
</div>
  );
};
 
export { OfferCard };

/**
* Demo View showing variant states
*/
export default function OfferGridDemo() {
  return (
<div className="p-12 space-y-20 bg-gray-50 min-h-screen font-sans">
<div className="max-w-6xl mx-auto space-y-12">
<h1 className="text-4xl font-serif font-bold border-b pb-4">Offer Card Variants</h1>
<section className="space-y-6">
<h2 className="text-xs uppercase tracking-widest text-gray-500 font-bold">Featured Layout (Light Theme)</h2>
<OfferCard layout="featured" theme="light" />
</section>
 
        <section className="space-y-6">
<h2 className="text-xs uppercase tracking-widest text-gray-500 font-bold">Standard Layout (Dark Theme)</h2>
<div className="grid md:grid-cols-3 gap-8">
<OfferCard layout="standard" theme="dark" />
<OfferCard 
              layout="standard" 
              theme="dark" 
              targetOffer={{
                offerTitle: "Golf & Spa Weekend getaway",
                teaser: "Enjoy a weekend combining the best of our championship courses and world-class spa.",
                badgeLabel: "Member Only",
                cardImage: "https://omni.optimarvin.com/globalassets/scottsdale-montelucia--phxrst-omni-scottsdale-aerial-drone-image-sunset-2800x1180.jpg",
                ctaLabel: "Reserve Now",
                ctaUrl: "#",
                stayWindow: "Valid Weekends Thru Dec",
                primaryCategory: "Resort Activities"
              }}
            />
<OfferCard 
              layout="standard" 
              theme="light" 
              targetOffer={{
                offerTitle: "Bed & Breakfast Package",
                teaser: "Start your morning right with a fresh, chef-prepared breakfast for two in our signature restaurant.",
                badgeLabel: "Best Value",
                cardImage: "https://omni.optimarvin.com/globalassets/fort-worth--ftwdtn-couple-dining-2800x1180.jpg",
                ctaLabel: "Learn More",
                ctaUrl: "#",
                stayWindow: "Ongoing",
                primaryCategory: "Packages"
              }}
            />
</div>
</section>
</div>
</div>
  );
}