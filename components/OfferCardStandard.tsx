import React from 'react';
import type { ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import type { OfferCard as OfferCardContentType } from '@/cms/content-types/OfferCard';

const Calendar = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

type Props = {
  content: ContentProps<typeof OfferCardContentType>;
};

const OfferCardStandard = ({ content }: Props) => {
  const { pa } = getPreviewUtils(content);

  const offer = ((content.targetOffer ?? {}) as Record<string, unknown>) as {
    offerTitle?: string;
    shortTeaser?: string;
    badge?: string;
    cardImage?: { url?: { default?: string } };
    HeroImage?: { url?: { default?: string } };
    ctaLabel?: string;
    ctaUrl?: { default?: string };
    stayWindow?: string;
    primaryCategoryRef?: { name?: string };
  };
  const overrideCardImage = (content as { overrideCardImage?: { url?: { default?: string } } })
    .overrideCardImage;

  const offerTitle = content.overrideHeadline || offer.offerTitle || '';
  const teaser = offer.shortTeaser || '';
  const badgeLabel = content.overrideBadgeLabel || offer.badge || '';
  const cardImage =
    overrideCardImage?.url?.default ||
    offer.cardImage?.url?.default ||
    offer.HeroImage?.url?.default ||
    '';
  const ctaLabel = content.overrideCtaLabel || offer.ctaLabel || 'Learn More';
  const ctaUrl = offer.ctaUrl?.default || '#';
  const stayWindow = offer.stayWindow || '';
  const primaryCategory = offer.primaryCategoryRef?.name || '';

  const theme = (content.theme as 'dark' | 'light') || 'dark';
  const showBadge = content.showBadge ?? true;
  const showCategory = content.showCategory ?? true;
  const showDates = content.showDates ?? true;

  if (!offerTitle && !cardImage) return null;

  const isDark = theme === 'dark';
  const themeClasses = isDark
    ? 'bg-[#111] text-white border-white/5 hover:border-amber-600/30'
    : 'bg-white text-gray-900 border-gray-100 hover:border-amber-600/30';

  return (
    <div className={`group border rounded-sm overflow-hidden transition-all duration-500 shadow-xl ${themeClasses}`}>
      <div className="relative h-64 overflow-hidden">
        {showBadge && badgeLabel && (
          <div
            {...pa('overrideBadgeLabel')}
            className="absolute top-4 left-4 z-10 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow-lg"
          >
            {badgeLabel}
          </div>
        )}
        {cardImage && (
          <img
            {...pa('overrideCardImage')}
            src={cardImage}
            alt={offerTitle}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
      </div>
      <div className="p-8 space-y-5">
        {showCategory && primaryCategory && (
          <span className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-bold">
            {primaryCategory}
          </span>
        )}
        <h3 {...pa('overrideHeadline')} className="text-2xl font-serif font-bold leading-tight min-h-[3.5rem]">
          {offerTitle}
        </h3>
        <p {...pa('overrideTeaser')} className={`text-sm font-light leading-relaxed line-clamp-2 italic ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {teaser}
        </p>
        {showDates && stayWindow && (
          <div className={`pt-4 flex items-center space-x-3 text-[10px] border-t uppercase tracking-widest font-semibold ${isDark ? 'text-gray-500 border-white/10' : 'text-gray-400 border-gray-100'}`}>
            <Calendar className="text-amber-600" />
            <span>{stayWindow}</span>
          </div>
        )}

        <div className="pt-2">
          <a
            {...pa('overrideCtaLabel')}
            href={ctaUrl}
            className={`flex items-center justify-center space-x-3 w-full border font-bold uppercase tracking-[0.2em] text-xs py-4 transition-all duration-300 ${
              isDark
                ? 'border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-white'
                : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export { OfferCardStandard };
export default OfferCardStandard;
