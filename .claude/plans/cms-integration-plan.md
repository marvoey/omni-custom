# CMS Integration Plan

## Context
Integrating Optimizely CMS content with Next.js React components. The project has:
- 6 CMS content types defined in TypeScript (`cms/content-types/`)
- React components that currently accept hardcoded data
- Environment variables configured for GraphQL access
- Pages using hardcoded data instead of fetching from CMS

## Goals
1. Set up GraphQL client initialization in root layout
2. Create CMS query utilities to fetch typed content
3. Update pages and components to fetch from CMS instead of hardcoded data
4. Maintain type safety between CMS content types and React components

## Implementation Approach

### Phase 1: Client Setup
- Initialize `config()` in `app/layout.tsx` with `OPTIMIZELY_GRAPH_SINGLE_KEY`
- Create `lib/cms-client.ts` to export configured `getClient()`

### Phase 2: Query Utilities
- Create `lib/cms-queries.ts` with typed GraphQL queries for each content type:
  - `fetchHeroCarousel()` → returns carousel config + slides
  - `fetchOffers()` → returns array of OfferEntityV2 items
  - `fetchRestaurant(key?)` → returns single RestaurantEntity
  - `fetchTaxonomy()` → returns taxonomy items (if used)

### Phase 3: Component Data Mapping
- Update components to accept CMS-shaped props (already match mostly)
- Create mappers to transform CMS responses to component prop shapes (if needed)

### Phase 4: Page Updates
Priority order:
1. `app/page.tsx` - fetch HeroCarousel + offers for homepage
2. `app/restaurant/page.tsx` - fetch RestaurantEntity by key
3. `app/restaurant2/page.tsx` - fetch RestaurantEntity 
4. `app/components/page.tsx` - for demo, can stay hardcoded or fetch

### Phase 5: Testing
- Run dev server and verify data loads from CMS
- Check that components render correctly with fetched data
- Verify no TypeScript errors

## Critical Files to Modify
- `app/layout.tsx` - add config() call
- `lib/cms-client.ts` (new) - client export
- `lib/cms-queries.ts` (new) - query functions
- `app/page.tsx` - fetch data in server component
- `app/restaurant/page.tsx` - fetch data
- `app/restaurant2/page.tsx` - fetch data

## API Reference (from @optimizely/cms-sdk)
```ts
config({ apiKey, graphUrl?, host?, cache?, slot? })
getClient() → GraphClient
GraphClient.request(query, variables)
GraphClient.getContent({ key, locale?, version? })
GraphClient.getContentByPath(path)
```

## CMS Content Types & Expected Responses
From `cms/content-types/`:
- **HeroCarousel**: carouselName, autoplaySpeed, transitionStyle, Slides[]
- **HeroSlideItem**: targetOffer (ref), overrideTitle, overrideTeaser, overrideCtaLabel, overlayOpacity
- **OfferEntityV2**: offerTitle, teaser, badgeLabel, cardImage, ctaLabel, ctaUrl, bookingWindow, stayWindow, offerCode, primaryCategory
- **RestaurantEntity**: restaurantName, cuisine, overview, description (richText), hours, menuLink, reservationUrl, locationTags, heroImage
- **TaxonomyItem**: taxonomyName, taxonomyValue

## Known Issues to Address
1. `restaurant/page.tsx` uses PascalCase field names (RestaurantName, HeroImage) → align with camelCase
2. `OfferCardv2.tsx` has no TypeScript interface → add one matching CMS type
3. Multiple hardcoded values in JSX (dress code, cuisine label, property name) → move to CMS if needed
