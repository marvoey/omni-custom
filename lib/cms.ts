import { GraphClient, getClient as getSdkClient } from '@optimizely/cms-sdk';

function createClient() {
  return new GraphClient(process.env.OPTIMIZELY_GRAPH_SINGLE_KEY!, {
    graphUrl: process.env.OPTIMIZELY_GRAPH_GATEWAY || undefined,
  });
}

// For dev debugging - list all available pages and their URLs
export async function discoverAvailablePaths() {
  try {
    const client = getSdkClient();
    const result = await client.request(
      `
      query {
        _Page(limit: 100) {
          items {
            _metadata { displayName url { default hierarchical } locale }
            __typename
          }
        }
      }
      `,
      {}
    );

    const items = result?.data?._Page?.items ?? [];
    console.log('📄 Available pages in CMS:');
    items.forEach((item: any) => {
      const url = item._metadata?.url?.default || item._metadata?.url?.hierarchical || '(no url)';
      const locale = item._metadata?.locale || '(unknown locale)';
      const name = item._metadata?.displayName || '(unnamed)';
      console.log(`   [${locale}] ${url} - ${name}`);
    });

    return items;
  } catch (error) {
    console.error('Error discovering paths:', error);
    return [];
  }
}

export type CmsOffer = {
  offerTitle: string | null;
  shortTeaser: string | null;
  badge: string | null;
  cardImage: { url: { default: string | null } } | null;
  ctaLabel: string | null;
  ctaUrl: { default: string | null } | null;
  OfferCode: string | null;
  bookingWindow: string | null;
  stayWindow: string | null;
};

export type CmsRestaurant = {
  _id: string;
  _metadata: {
    key: string;
    locale: string;
    displayName: string;
    fallbackForLocale: string;
    version: string;
    url: { base: string; path: string };
    types: string[];
    published: string;
    status: string;
    created: string;
    lastModified: string;
    sortOrder: number;
    variation: string;
  };
  __typename: string;
  restaurantName: string | null;
  cuisine: string | null;
  overview: string | null;
  description: { json: { type: 'richText'; children: any[] }; html: string } | null;
  hours: string | null;
  menuLink: { title: string | null; url: { default: string | null } } | null;
  reservationUrl: { default: string | null } | null;
  locationTags: string[] | null;
  heroImage: { url: { default: string | null }; key: string } | null;
};

export async function fetchOffers(): Promise<CmsOffer[]> {
  try {
    const client = createClient();
    const result = await client.request(
      `query {
        OfferEntityV2(limit: 10) {
          items {
            offerTitle
            shortTeaser
            badge
            cardImage { url { default } }
            ctaLabel
            ctaUrl { default }
            OfferCode
            bookingWindow
            stayWindow
          }
        }
      }`,
      {},
    );
    return result?.data?.OfferEntityV2?.items ?? [];
  } catch {
    return [];
  }
}

export async function fetchRestaurant(): Promise<CmsRestaurant | null> {
  try {
    const client = createClient();
    const result = await client.request(
      `query {
        RestaurantEntity(limit: 1) {
          items {
            _id
            _metadata {
              key
              locale
              displayName
              fallbackForLocale
              version
              url { base path }
              types
              published
              status
              created
              lastModified
              sortOrder
              variation
            }
            __typename
            restaurantName
            cuisine
            overview
            description { json html }
            hours
            menuLink { title url { default } }
            reservationUrl { default }
            locationTags
            heroImage { url { default } key }
          }
        }
      }`,
      {},
    );
    return result?.data?.RestaurantEntity?.items?.[0] ?? null;
  } catch {
    return null;
  }
}
