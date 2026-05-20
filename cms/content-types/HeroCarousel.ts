import { contentType } from '@optimizely/cms-sdk';
import { HeroSlideItem } from './HeroSlideItem';

export const HeroCarousel = contentType({
  key: 'HeroCarousel',
  displayName: 'Hero Carousel',
  description: 'Flagship homepage carousel that renders a collection of Offer Slide Items.',
  baseType: '_component',
  compositionBehaviors: ['sectionEnabled'],
  properties: {
    carouselName: {
      type: 'string',
      displayName: 'Internal Name',
      description: 'Internal name for identifying this carousel.',
    },
    autoplaySpeed: {
      type: 'integer',
      displayName: 'Autoplay Speed',
      description: 'Speed in seconds for slide rotation.',
    },
    transitionStyle: {
      type: 'string',
      displayName: 'Transition Style',
      description: 'How the slides animate between transitions.',
    },
    Slides: {
      type: 'array',
      displayName: 'Slides',
      items: {
        type: 'content',
        allowedTypes: [HeroSlideItem],
      },
    },
  },
});
