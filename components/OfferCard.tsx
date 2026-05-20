import React from 'react';
import type { ContentProps } from '@optimizely/cms-sdk';
import type { OfferCard as OfferCardContentType } from '@/cms/content-types/OfferCard';

const Calendar = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const Tag = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><path d="M7 7h.01"/></svg>
);

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
  content?: ContentProps<typeof OfferCardContentType>;
}

function deriveFromContent(
  content: ContentProps<typeof OfferCardContentType>,
): {
  targetOffer: TargetOffer;
  layout: 'standard' | 'featured';
  theme: 'dark' | 'light';
  showBadge: boolean;
  showCategory: boolean;
  showDates: boolean;
} {
  const offer = ((content.targetOffer ?? {}) as Record<string, unknown>) as {
    offerTitle?: string;
    shortTeaser?: string;
    badge?: string;
    cardImage?: { url?: { default?: string } };
    HeroImage?: { url?: { default?: string } };
    ctaLabel?: string;
    ctaUrl?: { default?: string };
    bookingWindow?: string;
    stayWindow?: string;
    OfferCode?: string;
    primaryCategoryRef?: { name?: string };
  };
  const overrideCardImage = (content as { overrideCardImage?: { url?: { default?: string } } })
    .overrideCardImage;

  return {
    targetOffer: {
      offerTitle: content.overrideHeadline || offer.offerTitle || '',
      teaser: offer.shortTeaser || '',
      badgeLabel: content.overrideBadgeLabel || offer.badge || undefined,
      cardImage:
        overrideCardImage?.url?.default ||
        offer.cardImage?.url?.default ||
        offer.HeroImage?.url?.default ||
        '',
      ctaLabel: content.overrideCtaLabel || offer.ctaLabel || 'Learn More',
      ctaUrl: offer.ctaUrl?.default || '#',
      bookingWindow: offer.bookingWindow || undefined,
      stayWindow: offer.stayWindow || undefined,
      offerCode: offer.OfferCode || undefined,
      primaryCategory: offer.primaryCategoryRef?.name || undefined,
    },
    layout: (content.layout as 'standard' | 'featured') || 'standard',
    theme: (content.theme as 'dark' | 'light') || 'dark',
    showBadge: content.showBadge ?? true,
    showCategory: content.showCategory ?? true,
    showDates: content.showDates ?? true,
  };
}

const OfferCard = ({
  layout: layoutProp,
  theme: themeProp,
  showBadge: showBadgeProp,
  showCategory: showCategoryProp,
  showDates: showDatesProp,
  targetOffer: targetOfferProp,
  content,
}: OfferCardProps) => {
  const derived = content ? deriveFromContent(content) : null;
  const targetOffer = targetOfferProp ?? derived?.targetOffer;
  if (!targetOffer) return null;

  const layout = layoutProp ?? derived?.layout ?? 'standard';
  const theme = themeProp ?? derived?.theme ?? 'dark';
  const showBadge = showBadgeProp ?? derived?.showBadge ?? true;
  const showCategory = showCategoryProp ?? derived?.showCategory ?? true;
  const showDates = showDatesProp ?? derived?.showDates ?? true;

  const isFeatured = layout === 'featured';
  const isDark = theme === 'dark';
  const themeClasses = isDark
    ? 'bg-[#111] text-white border-white/5 hover:border-amber-600/30'
    : 'bg-white text-gray-900 border-gray-100 hover:border-amber-600/30';

  if (isFeatured) {
    return (
      <div className={`relative border rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl transition-all duration-500 ${themeClasses}`}>
        {showBadge && targetOffer.badgeLabel && (
          <div className="absolute top-8 left-8 z-10 bg-black text-white text-[11px] font-bold uppercase tracking-widest px-4 py-2 border-l-4 border-amber-600 shadow-xl">
            {targetOffer.badgeLabel}
          </div>
        )}

        <div className="md:w-5/12 h-[400px] md:h-auto overflow-hidden">
          {targetOffer.cardImage && (
            <img
              src={targetOffer.cardImage}
              alt={targetOffer.offerTitle}
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
            />
          )}
        </div>

        <div className="md:w-7/12 p-10 md:p-16 flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            {showCategory && targetOffer.primaryCategory && (
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
              {showDates && targetOffer.bookingWindow && (
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
            <a
              href={targetOffer.ctaUrl}
              className="w-full sm:w-auto bg-[#da3743] hover:bg-[#c12631] text-white px-10 py-5 font-bold uppercase tracking-widest transition shadow-lg active:scale-95 text-center"
            >
              {targetOffer.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`group border rounded-sm overflow-hidden transition-all duration-500 shadow-xl ${themeClasses}`}>
      <div className="relative h-64 overflow-hidden">
        {showBadge && targetOffer.badgeLabel && (
          <div className="absolute top-4 left-4 z-10 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow-lg">
            {targetOffer.badgeLabel}
          </div>
        )}
        {targetOffer.cardImage && (
          <img
            src={targetOffer.cardImage}
            alt={targetOffer.offerTitle}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
      </div>
      <div className="p-8 space-y-5">
        {showCategory && targetOffer.primaryCategory && (
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
        {showDates && targetOffer.stayWindow && (
          <div className={`pt-4 flex items-center space-x-3 text-[10px] border-t uppercase tracking-widest font-semibold ${isDark ? 'text-gray-500 border-white/10' : 'text-gray-400 border-gray-100'}`}>
            <Calendar className="text-amber-600" />
            <span>{targetOffer.stayWindow}</span>
          </div>
        )}

        <div className="pt-2">
          <a
            href={targetOffer.ctaUrl}
            className={`flex items-center justify-center space-x-3 w-full border font-bold uppercase tracking-[0.2em] text-xs py-4 transition-all duration-300 ${
              isDark
                ? 'border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-white'
                : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
            }`}
          >
            <span>{targetOffer.ctaLabel}</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export { OfferCard };
export default OfferCard;
