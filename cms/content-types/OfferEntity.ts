import { contentType } from '@optimizely/cms-sdk';
import { TaxonomyItem } from './TaxonomyItem';

export const OfferEntity = contentType({
  key: 'OfferEntity',
  displayName: 'Omni: Offer Entity',
  baseType: '_component',
  compositionBehaviors: ['sectionEnabled', 'elementEnabled'],
  properties: {
    testString: { type: 'string', displayName: 'Test' },
    HealthCheck: { type: 'string', displayName: 'Health Check' },
    badgeLabel: {
      type: 'string',
      displayName: 'Badge Label',
      description: 'A small badge or label displayed on the offer card.',
    },
    cardImage: {
      type: 'contentReference',
      displayName: 'Card Image',
      description: 'Image used specifically for cards and promotional grids.',
      allowedTypes: ['_image'],
    },
    bookingWindow: {
      type: 'string',
      displayName: 'Booking Window',
      description: 'The timeframe during which the offer can be booked.',
    },
    offerTitle: { type: 'string', displayName: 'Offer Title' },
    teaser: { type: 'string', displayName: 'Short Teaser' },
    description: { type: 'richText', displayName: 'Full Description' },
    ctaLabel: { type: 'string', displayName: 'CTA Label' },
    ctaUrl: { type: 'link', displayName: 'CTA URL' },
    offerCode: { type: 'string', displayName: 'Offer Code' },
    stayWindow: { type: 'string', displayName: 'Stay Window' },
    heroImage: {
      type: 'contentReference',
      displayName: 'Hero Image',
      allowedTypes: ['_image'],
    },
    SingleTaxonomy: {
      type: 'contentReference',
      displayName: 'Primary Category',
      allowedTypes: [TaxonomyItem],
    },
    SecondaryCategory: {
      type: 'contentReference',
      displayName: 'Secondary Category',
      allowedTypes: [TaxonomyItem],
    },
    TargetRegion: {
      type: 'contentReference',
      displayName: 'Target Region',
      allowedTypes: [TaxonomyItem],
    },
    TargetProperty: {
      type: 'contentReference',
      displayName: 'Target Property',
      allowedTypes: [TaxonomyItem],
    },
  },
});
