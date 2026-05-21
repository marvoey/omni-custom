import { contentType } from '@optimizely/cms-sdk';
import { OfferEntityV2 } from './OfferEntityV2';

export const OfferCard = contentType({
  key: 'OfferCard',
  displayName: 'Omni: Offer Card',
  description: 'Card rendering of an Offer with layout + theme variants and editor overrides.',
  baseType: '_component',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    targetOffer: {
      type: 'array',
      displayName: 'Target Offer',
      description: 'One or more hospitality offers. Standard layout renders each as a card; featured layout uses the first.',
      items: {
        type: 'content',
        allowedTypes: [OfferEntityV2],
      },
    },
    layout: {
      type: 'string',
      displayName: 'Layout Style',
      description: 'Choose between a standard compact card or a larger featured layout.',
      enum: [
        { value: 'standard', displayName: 'Standard' },
        { value: 'featured', displayName: 'Featured' },
      ],
    },
    theme: {
      type: 'string',
      displayName: 'Theme Variant',
      description: 'Switch between light (premium white) and dark (charcoal) visual themes.',
      enum: [
        { value: 'light', displayName: 'Light' },
        { value: 'dark', displayName: 'Dark' },
      ],
    },
    ctaStyle: { type: 'string', displayName: 'CTA Style', description: 'Visual style of the call-to-action button.' },
    showBadge: {
      type: 'boolean',
      displayName: 'Badge Visibility',
      description: "Toggle the visibility of the promotion badge (e.g., 'Exclusive Event').",
    },
    showDates: {
      type: 'boolean',
      displayName: 'Date Visibility',
      description: 'Toggle the visibility of the booking and stay window dates.',
    },
    showCategory: {
      type: 'boolean',
      displayName: 'Category Visibility',
      description: 'Toggle the visibility of the primary category label.',
    },
    overrideHeadline: { type: 'string', displayName: 'Override Headline' },
    overrideTeaser: { type: 'richText', displayName: 'Override Teaser' },
    overrideCtaLabel: { type: 'string', displayName: 'Override CTA Label' },
    overrideBadgeLabel: { type: 'string', displayName: 'Override Badge Label' },
    overrideCardImage: {
      type: 'contentReference',
      displayName: 'Override Card Image',
      allowedTypes: ['_image'],
    },
  },
});
