import React from 'react';
import type { ContentProps } from '@optimizely/cms-sdk';
import type { OfferCard as OfferCardContentType } from '@/cms/content-types/OfferCard';
import OfferCardFeatured from './OfferCardFeatured';
import OfferCardStandard from './OfferCardStandard';

type Props = {
  content: ContentProps<typeof OfferCardContentType>;
};

const OfferCard = ({ content }: Props) => {
  const layout = (content.layout as 'standard' | 'featured') || 'standard';
  const offers = (Array.isArray(content.targetOffer) ? content.targetOffer : []) as Record<
    string,
    unknown
  >[];

  if (layout === 'featured') {
    const featuredContent = { ...content, targetOffer: offers[0] ?? {} } as unknown as typeof content;
    return <OfferCardFeatured content={featuredContent} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {offers.map((offer, i) => {
        const itemContent = { ...content, targetOffer: offer } as unknown as typeof content;
        return <OfferCardStandard key={i} content={itemContent} />;
      })}
    </div>
  );
};

export { OfferCard };
export default OfferCard;
