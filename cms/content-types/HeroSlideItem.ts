import { contentType } from '@optimizely/cms-sdk';
import { OfferEntityV2 } from './OfferEntityV2';

export const HeroSlideItem = contentType({
  key: 'HeroSlideItem',
  displayName: 'Omni: Hero Slide Item',
  description: 'A single slide in a HeroCarousel — references an OfferEntityV2 with optional per-slide overrides.',
  baseType: '_component',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    targetOffer: {
      type: 'contentReference',
      displayName: 'Target Offer',
      description: 'The Offer entity to pull data from.',
      allowedTypes: [OfferEntityV2],
    },
    overrideTitle: {
      type: 'string',
      displayName: 'Override Title',
      description: 'Optional headline to replace the default Offer title.',
    },
    overrideTeaser: {
      type: 'string',
      displayName: 'Override Teaser',
      description: 'Optional text to replace the default Offer teaser.',
    },
    overrideCtaLabel: {
      type: 'string',
      displayName: 'Override CTA Label',
      description: 'Optional label to replace the default Offer CTA.',
    },
    overlayOpacity: {
      type: 'integer',
      displayName: 'Overlay Opacity (0-100)',
      description: 'Adjust the darkness of the image overlay to ensure text readability.',
    },
  },
});
