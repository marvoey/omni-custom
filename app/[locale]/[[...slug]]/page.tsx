import { notFound } from 'next/navigation';
import { getClient } from '@optimizely/cms-sdk';
import { OptimizelyComponent, withAppContext } from '@optimizely/cms-sdk/react/server';

type Props = {
  params: Promise<{ locale: string; slug?: string[] }>;
};

async function LocalePage({ params }: Props) {
  const { locale, slug } = await params;
  const path = '/' + [locale, ...(slug ?? [])].join('/') + '/';

  const client = getClient();
  const results = await client.getContentByPath(path);
  const content = results?.[0];

  if (!content) {
    console.log(`❌ No page at "${path}"`);
    notFound();
  }

  return <OptimizelyComponent content={content} />;
}

export default withAppContext(LocalePage);
