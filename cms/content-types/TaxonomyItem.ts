import { contentType } from '@optimizely/cms-sdk';

export const TaxonomyItem = contentType({
  key: 'TaxonomyItem',
  displayName: 'Taxonomy Item',
  description: 'Reusable taxonomy entity for categorizing Omni offers and properties.',
  baseType: '_component',
  compositionBehaviors: ['elementEnabled'],
  properties: {
    name: { type: 'string', displayName: 'Category Name' },
    key: { type: 'string', displayName: 'Machine Key' },
    description: { type: 'string', displayName: 'Description' },
    parentCategory: { type: 'contentReference', displayName: 'Parent Category' },
  },
});
