import { contentType } from '@optimizely/cms-sdk';

export const RestaurantEntity = contentType({
  key: 'RestaurantEntity',
  displayName: 'Omni: Restaurant (Reusable)',
  description: 'Restaurant detail component for property dining showcases.',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled', 'sectionEnabled'],
  properties: {
    restaurantName: { type: 'string', displayName: 'Restaurant Name' },
    cuisine: { type: 'string', displayName: 'Cuisine Type' },
    overview: { type: 'string', displayName: 'Overview Teaser' },
    description: {
      type: 'richText',
      displayName: 'Description',
      description: 'Full editorial body for the restaurant detail page.',
    },
    heroImage: {
      type: 'contentReference',
      displayName: 'Hero Image',
      description: 'Hero image rendered at the top of the restaurant page.',
      allowedTypes: ['_image'],
    },
    hours: { type: 'string', displayName: 'Operating Hours' },
    menuLink: {
      type: 'link',
      displayName: 'Menu Link',
      description: 'Link to the digital menu (URL + label).',
    },
    reservationUrl: {
      type: 'url',
      displayName: 'Reservation URL',
      description: 'OpenTable / external reservation system URL.',
    },
    locationTags: {
      type: 'array',
      displayName: 'Location Tags',
      description: 'Short location labels (e.g., property name, city).',
      items: { type: 'string' },
    },
  },
});
