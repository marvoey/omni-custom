import { contentType } from '@optimizely/cms-sdk';
import { RoomCard } from './RoomCard';

export const RoomCarouselSection = contentType({
  key: 'RoomCarouselSection',
  displayName: 'Omni: Room Carousel',
  description: '',
  baseType: '_component',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    Heading: {
      type: 'string',
      displayName: 'Main Carousel Title',
    },
    IntroText: {
      type: 'richText',
      displayName: 'Introduction Text',
    },
    CardsLink: {
      type: 'array',
      displayName: 'Cards Link',
      items: {
        type: 'content',
        allowedTypes: [RoomCard],
      },
    },
  },
});
