import { notFound } from 'next/navigation';
import { getClient, type ContentProps } from '@optimizely/cms-sdk';
import { withAppContext } from '@optimizely/cms-sdk/react/server';
import OmniLandingPage from '@/components/OmniLandingPage';
import { OmniLandingPage as OmniLandingPageContentType } from '@/cms/content-types/OmniLandingPage';

type Props = {
  params: Promise<{ locale: string; slug?: string[] }>;
};

async function LocalePage({ params }: Props) {
  const { locale, slug } = await params;
  const path = '/' + [locale, ...(slug ?? [])].join('/') + '/';

  const client = getClient();
  const results = await client.getContentByPath(path);

  const content = results?.find(
    (item) =>
      item?.__typename === 'OmniLandingPage' ||
      item?._metadata?.types?.includes('OmniLandingPage'),
  );

  if (!content) {
    console.log(`❌ No OmniLandingPage at "${path}"`);
    notFound();
  }

  return (
    <OmniLandingPage
      content={content as ContentProps<typeof OmniLandingPageContentType>}
    />
  );
}

export default withAppContext(LocalePage);
