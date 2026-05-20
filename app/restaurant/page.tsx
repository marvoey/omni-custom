//Restaurant detail page:
import React from 'react';
import { withAppContext } from '@optimizely/cms-sdk/react/server';
import { fetchRestaurant } from '@/lib/cms';
 
/**
* FIXED: Inline SVG Icons to resolve 'lucide-react' Module Not Found error.
*/
 
const ChevronDown = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);
 
const Utensils = ({ className }: { className?: string }) => (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
);
 
const Shirt = ({ className }: { className?: string }) => (
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.62 1.96V10a2 2 0 0 0 2 2 2 2 0 0 1 2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-7a2 2 0 0 1 2-2 2 2 0 0 0 2-2V5.42a2 2 0 0 0-1.62-1.96Z"/><path d="m16 2-4 3-4-3"/></svg>
);
 
const CalendarCheck = ({ className }: { className?: string }) => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
);
 
const ExternalLink = ({ className }: { className?: string }) => (
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
);
 
const Camera = ({ className }: { className?: string }) => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);
 
interface RestaurantData {
  RestaurantName: string;
  HeroTitle: string;
  HeroSubtitle: string;
  HeroImage: string;
  Description: string;
  MenuLink: { url: string; text: string };
  OpenTableID: number;
  Gallery: string[];
}

const RestaurantDetailPage = ({ data }: { data: RestaurantData }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 selection:bg-amber-500/30 font-sans">
          {/* HERO SECTION */}
    <header className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 z-0">
    <img 
                src={data.HeroImage} 
                alt={data.RestaurantName} 
                className="w-full h-full object-cover scale-105 opacity-60"
              />
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#050505]" />
    </div>
    
            <div className="relative z-10 text-center px-6 max-w-5xl">
    <div className="flex items-center justify-center space-x-4 mb-8">
    <div className="h-[1px] w-12 bg-amber-600" />
    <span className="text-amber-500 uppercase tracking-[0.4em] text-xs font-bold leading-none">
                  Omni PGA Frisco
    </span>
    <div className="h-[1px] w-12 bg-amber-600" />
    </div>
    <h1 className="text-6xl md:text-9xl font-bold uppercase tracking-tight leading-none mb-6">
                {data.HeroTitle.split(' ').map((word, i) => (
    <span key={i} className={word.toLowerCase() === 'heritage' || word.toLowerCase() === 'texan' ? "text-amber-500 italic block" : "block"}>
                    {word}{' '}
    </span>
                ))}
    </h1>
    <p className="text-lg md:text-2xl font-light italic tracking-widest uppercase text-gray-400 max-w-2xl mx-auto border-t border-white/10 pt-8">
                {data.HeroSubtitle}
    </p>
    
              <div className="mt-14 space-x-6">
    <button className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-5 font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_10px_30px_rgba(217,119,6,0.2)]">
                  Reserve a Table
    </button>
    </div>
    </div>
    
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50">
    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Discover</span>
    <div className="animate-bounce">
    <ChevronDown />
    </div>
    </div>
    </header>
    
          {/* CORE CONTENT GRID */}
    <main className="relative z-10 max-w-7xl mx-auto py-32 px-6">
    <div className="grid lg:grid-cols-12 gap-20">
    <article className="lg:col-span-8 space-y-20">
    <div className="space-y-12">
    <div className="relative">
    <span className="absolute -left-12 top-2 text-7xl text-amber-900/20 select-none">“</span>
    <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter leading-tight">
                      The Legend of <span className="text-amber-600 italic">Trick Rider</span>
    </h2>
    </div>
    <div 
                    className="text-xl md:text-2xl leading-relaxed text-gray-400 font-light space-y-8"
                    dangerouslySetInnerHTML={{ __html: data.Description }} 
                  />
    
                  <div className="pt-10 flex flex-wrap gap-6">
    <a 
                      href={data.MenuLink.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-4 px-8 py-4 border border-amber-600/50 text-amber-500 font-bold uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all duration-500"
    >
    <span>{data.MenuLink.text}</span>
    <ExternalLink className="ml-2" />
    </a>
    </div>
    </div>
    
                <div className="space-y-10">
    <div className="flex items-center space-x-4">
    <Camera className="text-amber-600" />
    <h3 className="text-sm uppercase tracking-[0.4em] text-gray-500 font-bold">Atmosphere and Design</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.Gallery.slice(0, 2).map((img, idx) => (
    <div key={idx} className="group relative overflow-hidden bg-gray-900 border border-white/5">
    <img 
                          src={img} 
                          alt="Interior Detail" 
                          className="w-full h-[450px] object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
                        />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex items-end">
    <span className="text-xs uppercase tracking-widest font-bold text-amber-500">View Atmosphere</span>
    </div>
    </div>
                    ))}
    </div>
    </div>
    </article>
    
              <aside className="lg:col-span-4 lg:pl-10">
    <div className="sticky top-12 space-y-8">
    <div className="bg-[#111111] border border-white/5 p-10 shadow-3xl overflow-hidden relative">
    <div className="absolute top-0 right-0 p-4 opacity-40">
    <CalendarCheck />
    </div>
    <h3 className="text-2xl font-bold mb-8 uppercase tracking-widest">Bookings</h3>
    <div className="space-y-8">
    <div className="bg-amber-600/5 border border-amber-600/20 p-8 rounded-sm text-center">
    <p className="text-[10px] text-amber-600 mb-4 underline uppercase tracking-[0.2em] font-bold">Recommended</p>
    <div className="text-3xl text-white mb-2 leading-tight">Trick Rider Frisco</div>
    <div className="text-[9px] uppercase tracking-[0.3em] text-gray-600 mb-8 border-t border-white/10 pt-4">Restaurant ID: {data.OpenTableID}</div>
    <button className="w-full bg-[#da3743] hover:bg-[#c12631] text-white py-4 font-bold uppercase tracking-widest transition-all rounded-sm">
                          Find a Table
    </button>
    </div>
    
                      <div className="pt-8 border-t border-white/10 space-y-6">
    <div className="flex items-start space-x-4">
    <Shirt className="text-gray-500 mt-1" />
    <div>
    <span className="block text-[10px] uppercase text-gray-500 tracking-widest mb-1 font-bold">Dress Code</span>
    <span className="text-sm font-medium">Business Casual</span>
    </div>
    </div>
    <div className="flex items-start space-x-4">
    <Utensils className="text-gray-500 mt-1" />
    <div>
    <span className="block text-[10px] uppercase text-gray-500 tracking-widest mb-1 font-bold">Cuisine</span>
    <span className="text-sm font-medium">Signature Steak and Seafood</span>
    </div>
    </div>
    </div>
    </div>
    </div>
    
                  <div className="p-8 border border-white/5 bg-white/1 flex items-center justify-between group cursor-pointer hover:bg-amber-600 transition-colors">
    <span className="text-xs uppercase tracking-[0.3em] font-bold group-hover:text-white">Location and Contact</span>
    <div className="group-hover:text-white -rotate-90">
    <ChevronDown />
    </div>
    </div>
    </div>
    </aside>
    
            </div>
    </main>
    
          <footer className="bg-black py-24 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
    <div className="w-20 h-[1px] bg-amber-600 mb-12" />
    <p className="text-gray-600 text-[10px] tracking-[0.5em] uppercase mb-6 text-center">
    &copy; 2026 Omni PGA Frisco Resort and Spa
    </p>
    <div className="flex space-x-12">
                {['Privacy', 'Accessibility', 'Contact', 'Site Map'].map((li) => (
    <a key={li} href="/workspace/output/Fixed pages/#" className="text-gray-500 hover:text-amber-500 transition-colors text-[9px] uppercase tracking-widest font-bold uppercase tracking-widest font-bold">
                    {li}
    </a>
                ))}
    </div>
    </div>
    </footer>
    </div>
  );
};
 
async function RestaurantPage() {
  const cmsData = await fetchRestaurant();

  const data: RestaurantData = {
    RestaurantName: cmsData?.restaurantName || "Trick Rider",
    HeroTitle: "A Bold Homage to Texan Heritage",
    HeroSubtitle: cmsData?.cuisine || "Authentic Rodeo Culture Meets Upscale Sophistication",
    HeroImage: cmsData?.heroImage?.url?.default || "https://omni.optimarvin.com/globalassets/fort-worth--ftwdtn-couple-dining-2800x1180.jpg",
    Description: cmsData?.description?.html || `
      <p>Trick Rider pays a spirited tribute to the legendary female trick riders of the rodeo across the Lone Star State. This upscale steakhouse blends authentic rodeo culture with a sophisticated atmosphere, featuring a hand-cut crystal horse chandelier that serves as the room’s crown jewel.</p>
      <p>Prepare for a dining experience defined by signature steaks, premium seafood, and a horse-shoe shaped bar that serves as the heart of Frisco’s evening scene. Whether you are seeking a refined dinner or a vibrant night of cocktails, Trick Rider captures the essence of modern Texan luxury.</p>
    `,
    MenuLink: {
      url: cmsData?.menuLink?.url?.default || "http://menus.omnihotels.com/htmlmenu/omnipgafriscoresort/trickrider",
      text: cmsData?.menuLink?.title || "View Digital Menu"
    },
    OpenTableID: 1278010,
    Gallery: [
      "https://omni.optimarvin.com/globalassets/san-francisco--sfodtn-montes-restaurant.jpg",
      "https://omni.optimarvin.com/globalassets/brand-dining-family-2.jpg"
    ]
  };

  return <RestaurantDetailPage data={data} />;
}

export default withAppContext(RestaurantPage);