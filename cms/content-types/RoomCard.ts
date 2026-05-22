import { contentType } from '@optimizely/cms-sdk';

export const RoomCard = contentType({
  key: 'RoomCard',
  displayName: 'Omni: Room Card',
  description: 'A single room card for the Select Room carousel.',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    Photo: {
      type: 'contentReference',
      displayName: 'Room Photo',
      allowedTypes: ['_image'],
    },
    Title: {
      type: 'string',
      displayName: 'Room Title',
    },
    Description: {
      type: 'string',
      displayName: 'Description',
    },
    LearnMoreLink: {
      type: 'link',
      displayName: 'Learn More Link',
    },
    BookNowLink: {
      type: 'link',
      displayName: 'Book Now Link',
    },
  },
});
