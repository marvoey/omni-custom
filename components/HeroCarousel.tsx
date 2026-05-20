"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSlideItem from './HeroSlideItem';
import type { ContentProps } from '@optimizely/cms-sdk';
import type { HeroCarousel as HeroCarouselContentType } from '@/cms/content-types/HeroCarousel';

type Slide = {
  heading?: string;
  description?: string;
  backgroundImage?: string;
  buttonLink?: string;
  buttonText?: string;
};

interface HeroCarouselProps {
  slides?: Slide[];
  autoPlay?: boolean;
  interval?: number;
  content?: ContentProps<typeof HeroCarouselContentType>;
}

function deriveSlidesFromContent(
  content: ContentProps<typeof HeroCarouselContentType>,
): Slide[] {
  const rawSlides = (content.Slides ?? []) as Array<{
    overrideTitle?: string;
    overrideTeaser?: string;
    overrideCtaLabel?: string;
    targetOffer?: {
      offerTitle?: string;
      shortTeaser?: string;
      ctaLabel?: string;
      ctaUrl?: { default?: string };
      cardImage?: { url?: { default?: string } };
      HeroImage?: { url?: { default?: string } };
    };
  }>;

  return rawSlides.map((slide) => {
    const offer = slide.targetOffer ?? {};
    return {
      heading: slide.overrideTitle || offer.offerTitle || '',
      description: slide.overrideTeaser || offer.shortTeaser || '',
      backgroundImage:
        offer.HeroImage?.url?.default || offer.cardImage?.url?.default || '',
      buttonText: slide.overrideCtaLabel || offer.ctaLabel || 'Learn More',
      buttonLink: offer.ctaUrl?.default || '#',
    };
  });
}

const HeroCarousel = ({
  slides: slidesProp,
  autoPlay = true,
  interval: intervalProp,
  content,
}: HeroCarouselProps) => {
  const slides = useMemo<Slide[]>(() => {
    if (slidesProp && slidesProp.length > 0) return slidesProp;
    if (content) return deriveSlidesFromContent(content);
    return [];
  }, [slidesProp, content]);

  const interval = intervalProp ?? (content?.autoplaySpeed ? content.autoplaySpeed * 1000 : 6000);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, nextSlide, slides.length]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="group relative h-[600px] w-full overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? '100%' : '-100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? '-100%' : '100%' }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          className="absolute inset-0 h-full w-full"
        >
          <HeroSlideItem
            {...slides[currentIndex]}
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <nav className="absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between px-4 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={prevSlide}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
            aria-label="Previous Slide"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
            aria-label="Next Slide"
          >
            →
          </button>
        </nav>
      )}

      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2.5 transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-gold-500 bg-[#d4af37]'
                  : 'w-2.5 bg-white/50 hover:bg-white/80'
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
