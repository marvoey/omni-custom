import { contentType } from '@optimizely/cms-sdk';

export const RestaurantDetail = contentType({
  key: 'RestaurantDetail',
  displayName: 'Omni: Restaurant Detail Page',
  description: 'Standalone detail page for a single restaurant.',
  baseType: '_page',
  properties: {
    HeroTitle: { type: 'string', displayName: 'Hero Title' },
    HeroSubtitle: { type: 'string', displayName: 'Hero Subtitle' },
    RestaurantName: { type: 'string', displayName: 'Restaurant Name' },
    HeroImage: {
      type: 'contentReference',
      displayName: 'Hero Image',
      allowedTypes: ['_image'],
    },
    Description: { type: 'richText', displayName: 'Description' },
    MenuLink: { type: 'link', displayName: 'Menu Link' },
    OpenTableID: { type: 'integer', displayName: 'OpenTable ID' },
    PrimaryCategory: { type: 'contentReference', displayName: 'Primary Category' },
    TargetProperty: { type: 'contentReference', displayName: 'Target Property' },
    Gallery: {
      type: 'array',
      displayName: 'Gallery Images',
      items: { type: 'contentReference', allowedTypes: ['_image'] },
    },
    Cuisine: { type: 'string', displayName: 'Cuisine Label' },
    DressCode: { type: 'string', displayName: 'Dress Code' },
  },
});
