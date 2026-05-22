'use client';

import React, { useState, useEffect } from 'react';
 
const rooms = [
  {
    id: 1,
    title: 'Deluxe King',
    description: 'Unwind in our spacious king room featuring modern amenities and breathtaking views of the fairway.',
    image: 'https://placehold.co/600x400/002D72/FFFFFF?text=Deluxe+King',
    color: '#002D72'
  },
  {
    id: 2,
    title: 'Deluxe Queen',
    description: 'Perfect for families or groups, offering two queen beds with premium linens and refined decor.',
    image: 'https://placehold.co/600x400/C5A059/FFFFFF?text=Deluxe+Queen',
    color: '#C5A059'
  },
  {
    id: 3,
    title: 'Balcony Suite',
    description: 'Elevate your stay with a private balcony and separate living area, perfect for entertaining.',
    image: 'https://placehold.co/600x400/333333/FFFFFF?text=Balcony+Suite',
    color: '#333333'
  },
  {
    id: 4,
    title: 'Ranch Home Villa',
    description: 'Experience ultimate privacy in our exclusive villas, featuring multi-room layouts and bespoke residential touches.',
    image: 'https://placehold.co/600x400/002D72/C5A059?text=Ranch+Home+Villa',
    color: '#002D72'
  },
  {
    id: 5,
    title: 'Presidential Suite',
    description: 'Our most prestigious accommodation, offering unparalleled luxury, panoramic views, and executive service.',
    image: 'https://placehold.co/600x400/C5A059/002D72?text=Presidential+Suite',
    color: '#C5A059'
  },
  {
    id: 6,
    title: 'Garden View Room',
    description: 'Peaceful retreats overlooking our manicured gardens, providing a serene escape from the action.',
    image: 'https://placehold.co/600x400/666666/FFFFFF?text=Garden+View',
    color: '#666666'
  },
  {
    id: 7,
    title: 'Executive King',
    description: 'Designed for the modern traveler with dedicated workstations and enhanced ergonomic comfort.',
    image: 'https://placehold.co/600x400/002D72/EEEEEE?text=Executive+King',
    color: '#002D72'
  }
];
 
// Inline SVG components to remove external dependencies
const ChevronLeft = ({ size = 24 }) => (
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<path d="m15 18-6-6 6-6"/>
</svg>
);
 
const ChevronRight = ({ size = 24 }) => (
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
<path d="m9 18 6-6-6-6"/>
</svg>
);
 
export default function RoomCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };
 
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  const totalSteps = rooms.length - visibleCards + 1;
 
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < totalSteps - 1 ? prev + 1 : prev));
  };
 
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };
 
  return (
<div className="min-h-screen bg-[#F4F1EA] py-16 px-4 font-serif">
<div className="max-w-7xl mx-auto">
        {/* Header */}
<div className="text-center mb-12">
<h2 className="text-4xl md:text-5xl text-[#002D72] uppercase tracking-widest mb-4 font-bold">
            Your Oasis at PGA Frisco
</h2>
<p className="text-gray-600 italic text-lg">
            Curated luxury designed for the ultimate retreat.
</p>
</div>
 
        {/* Carousel Container */}
<div className="relative group">
          {/* Controls */}
<button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 shadow-lg text-[#002D72] hover:text-[#C5A059] transition-all disabled:opacity-30 disabled:cursor-not-allowed`}
>
<ChevronLeft size={32} />
</button>
 
          <button
            onClick={nextSlide}
            disabled={currentIndex >= totalSteps - 1}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 shadow-lg text-[#002D72] hover:text-[#C5A059] transition-all disabled:opacity-30 disabled:cursor-not-allowed`}
>
<ChevronRight size={32} />
</button>
 
          {/* Track Container */}
<div className="overflow-hidden px-2">
<div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              }}
>
              {rooms.map((room) => (
<div
                  key={room.id}
                  className="flex-shrink-0"
                  style={{ width: `calc(${100 / visibleCards}% - 1.5rem)` }}
>
<div className="bg-white rounded-sm shadow-md overflow-hidden hover:-translate-y-2 transition-transform duration-300 border border-gray-200">
<div
                      className="h-64 bg-cover bg-center"
                      style={{ backgroundImage: `url(${room.image})` }}
                    />
<div className="p-6">
<h3 className="text-xl font-bold text-[#002D72] mb-3">
                        {room.title}
</h3>
<p className="text-gray-600 text-sm leading-relaxed mb-6 h-12 overflow-hidden">
                        {room.description}
</p>
<button className="bg-[#002D72] hover:bg-[#C5A059] text-white px-6 py-2 text-xs uppercase tracking-widest transition-colors duration-300 rounded-sm">
                        Explore Highlights
</button>
</div>
</div>
</div>
              ))}
</div>
</div>
</div>
 
        {/* Indicators */}
<div className="flex justify-center gap-3 mt-10">
          {Array.from({ length: totalSteps }).map((_, idx) => (
<button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'bg-[#C5A059] w-6' : 'bg-gray-300'
              }`}
            />
          ))}
</div>
</div>
</div>
  );
}