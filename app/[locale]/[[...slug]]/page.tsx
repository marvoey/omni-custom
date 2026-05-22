import { notFound } from 'next/navigation';
import { getClient } from '@optimizely/cms-sdk';
import { OptimizelyComponent, withAppContext } from '@optimizely/cms-sdk/react/server';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ locale: string; slug?: string[] }>;
};

async function LocalePage({ params }: Props) {
  const { locale, slug } = await params;
  const path = '/' + [locale, ...(slug ?? [])].join('/') + '/';

  const client = getClient();
  const results = await client.getContentByPath(path, { cache: false });
  const content = results?.[0];

  if (!content) {
    console.log(`❌ No page at "${path}"`);
    notFound();
  }

  const ssrStamp = `[ssr-debug] path=${path} ts=${new Date().toISOString()} version=${(content as { _metadata?: { version?: string } })?._metadata?.version ?? 'unknown'}`;

  return (
    <>
      <div data-ssr-debug style={{ display: 'none' }}>{ssrStamp}</div>
      <OptimizelyComponent content={content} />
    </>
  );
}

export default withAppContext(LocalePage);
