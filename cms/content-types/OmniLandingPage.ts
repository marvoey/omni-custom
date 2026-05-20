import { contentType } from '@optimizely/cms-sdk';

export const OmniLandingPage = contentType({
  key: 'OmniLandingPage',
  displayName: 'Omni: Landing Page',
  baseType: '_experience',
  mayContainTypes: ['OmniLandingPage'],
  properties: {},
});
