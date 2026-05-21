import { contentType } from '@optimizely/cms-sdk';

export const Paragraph = contentType({
  key: 'Paragraph',
  displayName: 'Paragraph',
  description: 'Basic text component for adding paragraph content.',
  baseType: '_component',
  compositionBehaviors: ['sectionEnabled', 'elementEnabled'],
  properties: {
    Text: {
      type: 'richText',
      displayName: 'Text',
      localized: true,
      indexingType: 'searchable',
    },
  },
});
