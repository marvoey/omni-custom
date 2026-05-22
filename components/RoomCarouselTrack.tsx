'use client';

import { useEffect, useState, type ReactNode } from 'react';

interface RoomCarouselTrackProps {
  slides: ReactNode[];
}

const ChevronLeft = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default function RoomCarouselTrack({ slides }: RoomCarouselTrackProps) {
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

  useEffect(() => {
    setCurrentIndex((idx) => {
      const maxIdx = Math.max(slides.length - visibleCards, 0);
      return Math.min(idx, maxIdx);
    });
  }, [slides.length, visibleCards]);

  const totalSteps = Math.max(slides.length - visibleCards + 1, 1);
  const safeIndex = Math.min(Math.max(currentIndex, 0), totalSteps - 1);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < totalSteps - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  if (slides.length === 0) return null;

  return (
    <>
      <div className="relative group">
        <button
          type="button"
          onClick={prevSlide}
          disabled={safeIndex === 0}
          aria-label="Previous rooms"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 shadow-lg text-[#002D72] hover:text-[#C5A059] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          disabled={safeIndex >= totalSteps - 1}
          aria-label="Next rooms"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 shadow-lg text-[#002D72] hover:text-[#C5A059] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight size={32} />
        </button>

        <div className="overflow-hidden px-2">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{
              transform: `translateX(-${safeIndex * (100 / visibleCards)}%)`,
            }}
          >
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className="shrink-0"
                style={{ width: `calc(${100 / visibleCards}% - 1.5rem)` }}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>
      </div>

      {totalSteps > 1 && (
        <div className="flex justify-center gap-3 mt-10">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                safeIndex === idx ? 'bg-[#C5A059] w-6' : 'bg-gray-300 w-2.5'
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
