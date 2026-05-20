import React from 'react';
import type { ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import type { OfferEntityV2 as OfferEntityV2Type } from '@/cms/content-types/OfferEntityV2';

type Props = {
  content: ContentProps<typeof OfferEntityV2Type>;
};

export const OfferCardV2 = ({ content }: Props) => {
  const { pa } = getPreviewUtils(content);

  const cardImage =
    (content.cardImage as { url?: { default?: string } } | undefined)?.url?.default ?? '';
  const offerTitle = content.offerTitle ?? '';
  const shortTeaser = content.shortTeaser ?? '';
  const badge = content.badge ?? '';
  const bookingWindow = content.bookingWindow ?? '';
  const stayWindow = content.stayWindow ?? '';
  const ctaLabel = content.ctaLabel ?? 'Reserve';
  const ctaUrl =
    (content.ctaUrl as { default?: string } | undefined)?.default ?? '#';
  const primaryCategory =
    (content.primaryCategoryRef as { name?: string } | undefined)?.name ?? '';
  const targetProperty =
    (content.targetProperty as { name?: string } | undefined)?.name ?? '';

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-sm shadow-xl overflow-hidden group transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-60 w-full overflow-hidden">
        {cardImage && (
          <img
            {...pa('cardImage')}
            src={cardImage}
            alt={offerTitle}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        {badge && (
          <div {...pa('badge')} className="absolute top-4 left-4 bg-[#c5a059] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            {badge}
          </div>
        )}
      </div>

      <div className="p-8 font-sans">
        <div className="flex items-center gap-2 mb-3 text-[10px] uppercase tracking-[0.2em] font-bold text-[#c5a059]">
          {primaryCategory && <span>{primaryCategory}</span>}
          {primaryCategory && targetProperty && <span className="text-gray-300">•</span>}
          {targetProperty && <span>{targetProperty}</span>}
        </div>

        <h2
          {...pa('offerTitle')}
          className="text-2xl text-[#1a1a1a] leading-tight mb-4 tracking-tight"
          style={{ fontFamily: 'serif' }}
        >
          {offerTitle}
        </h2>

        <p {...pa('shortTeaser')} className="text-sm leading-relaxed text-gray-600 mb-6 font-light antialiased">
          {shortTeaser}
        </p>

        <div className="grid grid-cols-2 gap-4 pt-5 mb-8 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#8e7341] mb-1">
              Booking Window
            </span>
            <span {...pa('bookingWindow')} className="text-[11px] text-gray-400 font-medium">
              {bookingWindow}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#8e7341] mb-1">
              Stay Window
            </span>
            <span {...pa('stayWindow')} className="text-[11px] text-gray-400 font-medium">
              {stayWindow}
            </span>
          </div>
        </div>

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

export default OfferCardV2;
