'use client';
import React, { useState } from 'react';
 
/**
* Omni Hospitality Navigation System - React Implementation
* 
* I have replaced the 'lucide-react' dependency with inline SVG components
* to ensure this runs perfectly in your environment.
*/
 
// --- Inline SVG Icons (Replacement for lucide-react) ---
const ChevronDown = ({ className }: { className?: string }) => (
<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);
 
const Menu = ({ size = 24 }) => (
<svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);
 
const X = ({ size = 24 }) => (
<svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
 
const ExternalLink = ({ className }: { className?: string }) => (
<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
);
 
// --- Component Logic ---
 
const Badge = ({ type }: { type?: string }) => {
  if (!type) return null;
  const styles: Record<string, string> = {
    'New': 'bg-emerald-100 text-emerald-800',
    'Featured': 'bg-blue-100 text-blue-800',
    'Seasonal': 'bg-amber-100 text-amber-800',
    'Limited Time': 'bg-red-100 text-red-800'
  };

  return (
<span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${styles[type]}`}>
      {type}
</span>
  );
};
 
type NavItem = { label: string; href: string; badge?: string; isExternal?: boolean };
type NavGroup = { name: string; items: NavItem[] };
type OmniNavigationProps = {
  propertyName?: string;
  corporateMenu?: NavGroup[];
  propertyAppends?: Record<string, NavItem[]>;
};

export default function OmniNavigation({
  propertyName = "Trick Rider",
  corporateMenu = [
    { name: 'Stay', items: [{ label: 'Rooms and Suites', href: '/stay' }] },
    { name: 'Offers', items: [{ label: 'Grand Opening Offer', href: '/offers/opening' }] },
    { name: 'Dining', items: [{ label: 'Bar and Lounge', href: '/dining/bar' }] },
    { name: 'Local Experiences', items: [] }
  ],
  propertyAppends = {
    'Dining': [
      { label: 'Reservations', href: '/reservations' },
      { label: 'The Cut: Seasonal Menu', href: '/menu', badge: 'Limited Time' }
    ],
    'Local Experiences': [
      { label: 'Cowboy Cocktails and Music', href: '/events/music', badge: 'Featured' },
      { label: 'Freedom Trail Classic Tours', href: '/activities/tours', badge: 'New' }
    ],
    'Offers': [
      { label: 'Scottsdale Spa Retreat', href: '/offers/spa', badge: 'Seasonal' }
    ]
  }
}: OmniNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // LOGIC: Merge Corporate Menu with Property Appends based on Group Name
  const mergedMenu = corporateMenu.map(group => ({
    ...group,
    items: [...(propertyAppends[group.name] || []), ...group.items]
  }));
 
  return (
<div className="min-h-[600px] bg-gray-50 font-sans">
<header className="fixed w-full z-50 bg-white shadow-lg border-b-2 border-[#8A7244]">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between h-24 items-center">
            {/* Brand Identity */}
<div className="flex flex-col cursor-pointer">
<h1 className="text-xl md:text-2xl font-bold text-[#002D72] tracking-widest uppercase leading-tight font-serif whitespace-nowrap">
                Omni Hotels {"And"} Resorts
</h1>
<span className="text-sm italic text-gray-400 uppercase tracking-widest">
                {propertyName}
</span>
</div>
 
            {/* Desktop Navigation Link Groups */}
<nav className="hidden xl:flex space-x-4 h-full">
              {mergedMenu.map((group) => (
<div 
                  key={group.name} 
                  className="relative flex items-center group h-full"
                  onMouseEnter={() => setActiveDropdown(group.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
>
<button className="text-gray-700 hover:text-[#8A7244] px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-colors flex items-center">
                    {group.name}
                    {group.items.length > 0 && (
<ChevronDown className={`ml-1 w-3 h-3 text-gray-400 transition-transform ${activeDropdown === group.name ? 'rotate-180' : ''}`} />
                    )}
</button>
 
                  {/* Mega Menu Dropdown */}
                  {group.items.length > 0 && (
<div className={`
                      absolute top-full left-0 w-80 bg-white border border-gray-100 shadow-2xl py-2
                      transition-all duration-200 transform
                      ${activeDropdown === group.name ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}
                    `}>
                      {group.items.map((item, idx) => (
<a 
                          key={`${group.name}-${idx}`}
                          href={item.href}
                          className="flex items-center justify-between px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-50 last:border-0"
                          onClick={(e) => e.preventDefault()}
>
<span className="font-medium">{item.label}</span>
<div className="flex items-center space-x-2">
<Badge type={item.badge} />
                            {item.isExternal && <ExternalLink className="w-3 h-3 text-gray-300" />}
</div>
</a>
                      ))}
</div>
                  )}
</div>
              ))}
</nav>
 
            {/* Global CTA and Mobile Trigger */}
<div className="flex items-center space-x-6">
<button className="hidden md:block bg-[#002D72] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#001D4A] transition-all transform hover:scale-105">
                Book a Room
</button>
<button 
                className="xl:hidden text-[#002D72]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
>
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
</button>
</div>
</div>
</div>
 
        {/* Mobile Slide-out Menu */}
        {mobileMenuOpen && (
<div className="xl:hidden fixed inset-0 top-24 bg-white z-40 overflow-y-auto">
<div className="p-6 space-y-8">
              {mergedMenu.map((group) => (
<div key={group.name} className="border-b border-gray-100 pb-4">
<h3 className="text-[10px] font-bold text-[#8A7244] uppercase tracking-[0.2em] mb-4">
                    {group.name}
</h3>
<ul className="space-y-4 ml-2">
                    {group.items.map((item, idx) => (
<li key={idx}>
<a 
                          href={item.href} 
                          className="flex items-center justify-between group"
                          onClick={(e) => e.preventDefault()}
>
<span className="text-xl text-[#002D72] font-serif">{item.label}</span>
<Badge type={item.badge} />
</a>
</li>
                    ))}
</ul>
</div>
              ))}
<div className="pt-4">
<button className="w-full bg-[#002D72] text-white py-5 font-bold uppercase tracking-widest shadow-xl hover:bg-[#001D4A]">
                  Reserve Now
</button>
</div>
</div>
</div>
        )}
</header>
 
      {/* Main Content Preview Area */}
<main className="pt-64 pb-20 px-8 max-w-5xl mx-auto text-center">
<div className="inline-block px-5 py-2 border border-[#8A7244] text-[#8A7244] text-[10px] font-bold uppercase tracking-[0.4em] mb-10">
          Hospitality Architecture 2.0
</div>
<h2 className="text-6xl md:text-8xl text-[#002D72] font-serif mb-10 leading-[1.1] tracking-tight">
          Crafting Legacies, One Property at a Time.
</h2>
<p className="text-gray-500 text-xl md:text-2xl font-light leading-relaxed mb-16 max-w-3xl mx-auto">
          This React-based navigation engine powers the <strong className="font-medium text-gray-900 text-nowrap">Landing Page</strong> template. 
          By intelligently merging corporate governance with property-specific storytelling, 
          Omni Hotels ensures consistency without sacrificing the local character 
          of gems like <em className="italic text-[#8A7244]">Trick Rider</em>.
</p>
</main>
</div>
  );
}