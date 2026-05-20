import { contentType } from '@optimizely/cms-sdk';
import { TaxonomyItem } from './TaxonomyItem';

export const OfferEntityV2 = contentType({
  key: 'OfferEntityV2',
  displayName: 'Offer (V2)',
  description: 'Canonical hospitality offer. Source of truth for HeroSlideItem and OfferCard.',
  baseType: '_component',
  properties: {
    offerTitle: {
      type: 'string',
      displayName: 'Offer Title',
      description: 'The public-facing headline for the offer.',
    },
    shortTeaser: {
      type: 'string',
      displayName: 'Short Teaser',
      description: 'A concise 2-3 sentence description of the offer.',
    },
    Description: { type: 'string', displayName: 'Description' },
    badge: {
      type: 'string',
      displayName: 'Badge / Label',
      description: "A short highlight label (e.g. 'Flash Sale').",
    },
    cardImage: {
      type: 'contentReference',
      displayName: 'Card Image',
      description: 'The primary image for use in cards and carousels.',
      allowedTypes: ['_image'],
    },
    HeroImage: {
      type: 'content',
      displayName: 'HeroImage',
      allowedTypes: ['_image', '_video'],
    },
    ctaLabel: {
      type: 'string',
      displayName: 'CTA Label',
      description: 'Text for the action button.',
    },
    ctaUrl: {
      type: 'url',
      displayName: 'CTA URL',
      description: 'Destination URL for the offer link.',
    },
    OfferCode: { type: 'string', format: 'shortString', displayName: 'OfferCode' },
    bookingWindow: {
      type: 'string',
      displayName: 'Booking Window',
      description: 'The date range when this offer can be booked.',
    },
    stayWindow: {
      type: 'string',
      displayName: 'Stay Window',
      description: 'The date range when the stay must take place.',
    },
    primaryCategoryRef: {
      type: 'contentReference',
      displayName: 'Primary Category Selection',
      allowedTypes: [TaxonomyItem],
    },
    offerTypeRef: {
      type: 'contentReference',
      displayName: 'Offer Type Selection',
      allowedTypes: [TaxonomyItem],
    },
    targetProperty: {
      type: 'contentReference',
      displayName: 'Target Property',
      description: 'The hierarchical property this offer belongs to.',
      allowedTypes: [TaxonomyItem],
    },
    region: {
      type: 'contentReference',
      displayName: 'Region / Location',
      allowedTypes: [TaxonomyItem],
    },
    brand: {
      type: 'contentReference',
      displayName: 'Brand',
      allowedTypes: [TaxonomyItem],
    },
  },
});
