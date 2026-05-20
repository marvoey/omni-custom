import React from 'react';
import Image from 'next/image';
 
interface RestaurantProps {
  content: {
    restaurantName: string;
    cuisine: string;
    description: string;
    heroImage: { url: string; alt?: string };
    hours: string;
    menuLink: { url: string; title: string };
    reservationUrl: string;
    locationTags: string[];
  };
}
 
const RestaurantDetail: React.FC<RestaurantProps> = ({ content }) => {
  return (
<article className="bg-[#fdfcf8] min-h-screen font-sans text-stone-900">
      {/* Hero Section */}
<section className="relative h-[70vh] w-full">
<Image
          src={content.heroImage.url}
          alt={content.heroImage.alt || content.restaurantName}
          fill
          priority
          className="object-cover"
        />
<div className="absolute inset-0 bg-black/30" />
<div className="absolute inset-0 flex flex-col items-center justify-center text-white">
<span className="uppercase tracking-[0.3em] text-sm mb-4 bg-black/40 px-4 py-1 backdrop-blur-md">
            {content.cuisine}
</span>
<h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight text-center">
            {content.restaurantName}
</h1>
</div>
</section>
 
      {/* Content Grid */}
<section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: The Story */}
<div className="lg:col-span-7">
<h2 className="text-stone-400 uppercase tracking-widest text-xs font-bold mb-6">
            The Experience
</h2>
<div 
            className="prose prose-lg text-stone-700 leading-relaxed font-light first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left"
            dangerouslySetInnerHTML={{ __html: content.description }}
          />
<div className="mt-12 flex gap-6">
<a 
              href={content.menuLink.url} 
              className="border-b-2 border-stone-800 pb-1 font-bold hover:text-stone-500 hover:border-stone-500 transition-colors"
>
              {content.menuLink.title}
</a>
</div>
</div>
 
        {/* Right: Details & Reservation */}
<div className="lg:col-span-5 bg-stone-100 p-10 self-start border-l-4 border-stone-800">
<h3 className="font-serif text-2xl mb-8">Visit {content.restaurantName}</h3>
<div className="space-y-8">
<div>
<p className="uppercase text-[10px] tracking-widest text-stone-500 font-bold mb-1">
                Operating Hours
</p>
<p className="text-lg whitespace-pre-line">{content.hours}</p>
</div>
 
            <div>
<p className="uppercase text-[10px] tracking-widest text-stone-500 font-bold mb-1">
                Location
</p>
<p className="text-lg">{content.locationTags?.join(', ')}</p>
</div>
 
            <a
              href={content.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-stone-900 text-white py-4 px-8 uppercase tracking-widest font-bold hover:bg-stone-700 transition-colors"
>
              Reserve a Table
</a>
</div>
</div>
</section>
</article>
  );
};
 
export default RestaurantDetail;