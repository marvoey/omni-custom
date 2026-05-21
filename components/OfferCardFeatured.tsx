import React from 'react';
import type { ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import type { OfferCard as OfferCardContentType } from '@/cms/content-types/OfferCard';

const Tag = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
);

type Props = {
  content: ContentProps<typeof OfferCardContentType>;
};

const OfferCardFeatured = ({ content }: Props) => {
  const { pa } = getPreviewUtils(content);

  const offer = ((content.targetOffer ?? {}) as Record<string, unknown>) as {
    offerTitle?: string;
    shortTeaser?: string;
    badge?: string;
    cardImage?: { url?: { default?: string } };
    HeroImage?: { url?: { default?: string } };
    ctaLabel?: string;
    ctaUrl?: { default?: string };
    bookingWindow?: string;
    OfferCode?: string;
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
  const bookingWindow = offer.bookingWindow || '';
  const offerCode = offer.OfferCode || '';
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
    <div className={`relative border rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl transition-all duration-500 ${themeClasses}`}>
      {showBadge && badgeLabel && (
        <div
          {...pa('overrideBadgeLabel')}
          className="absolute top-8 left-8 z-10 bg-black text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2 border-l-4 border-amber-600 shadow-xl"
        >
          {badgeLabel}
        </div>
      )}

      <div className="md:w-5/12 h-[400px] md:h-auto overflow-hidden">
        {cardImage && (
          <img
            {...pa('overrideCardImage')}
            src={cardImage}
            alt={offerTitle}
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
          />
        )}
      </div>

      <div className="md:w-7/12 p-10 md:p-16 flex flex-col justify-center space-y-8">
        <div className="space-y-4">
          {showCategory && primaryCategory && (
            <span className={`text-xs uppercase tracking-[0.3em] font-bold ${isDark ? 'text-amber-500' : 'text-amber-700'}`}>
              {primaryCategory}
            </span>
          )}
          <h3 {...pa('overrideHeadline')} className="text-4xl md:text-5xl font-serif font-bold leading-tight uppercase tracking-tighter italic">
            {offerTitle}
          </h3>
          <p {...pa('overrideTeaser')} className={`text-lg font-light leading-relaxed max-w-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {teaser}
          </p>
        </div>

        {(showDates || offerCode) && (
          <div className={`grid grid-cols-2 gap-8 border-y py-8 ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
            {showDates && bookingWindow && (
              <div>
                <span className="block text-[10px] uppercase text-gray-400 tracking-widest mb-1">Booking Window</span>
                <span className="text-sm font-semibold">{bookingWindow}</span>
              </div>
            )}
            {offerCode && (
              <div>
                <span className="block text-[10px] uppercase text-gray-400 tracking-widest mb-1 font-bold">Offer Code</span>
                <div className="flex items-center space-x-2">
                  <Tag className="text-amber-600" />
                  <span className="text-sm font-serif font-bold tracking-widest">{offerCode}</span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <a
            {...pa('overrideCtaLabel')}
            href={ctaUrl}
            className="w-full sm:w-auto bg-[#da3743] hover:bg-[#c12631] text-white px-10 py-5 font-bold uppercase tracking-widest transition shadow-lg active:scale-95 text-center"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );
};

export { OfferCardFeatured };
export default OfferCardFeatured;
