import { GraphClient, type PreviewParams } from '@optimizely/cms-sdk';
import { OptimizelyComponent, withAppContext } from '@optimizely/cms-sdk/react/server';
import { PreviewComponent } from '@optimizely/cms-sdk/react/client';
import Script from 'next/script';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const INDEXING_ERROR_MARKER = 'No content found for key';
const RETRY_DELAYS_MS = [0, 400, 1000];

const isIndexingLatencyError = (err: unknown): boolean => {
  if (!err || typeof err !== 'object') return false;
  const name = (err as { name?: string }).name;
  const message = (err as { message?: string }).message ?? '';
  return (
    (name === 'GraphResponseError' || name?.endsWith('GraphResponseError') === true) &&
    message.includes(INDEXING_ERROR_MARKER)
  );
};

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function fetchPreviewWithRetry(
  client: GraphClient,
  params: PreviewParams,
): Promise<
  | { ok: true; response: Awaited<ReturnType<GraphClient['getPreviewContent']>> }
  | { ok: false }
> {
  let lastError: unknown;
  for (let attempt = 0; attempt < RETRY_DELAYS_MS.length; attempt++) {
    if (RETRY_DELAYS_MS[attempt] > 0) {
      await sleep(RETRY_DELAYS_MS[attempt]);
    }
    try {
      const response = await client.getPreviewContent(params);
      return { ok: true, response };
    } catch (err) {
      if (!isIndexingLatencyError(err)) {
        throw err;
      }
      lastError = err;
      console.warn(
        `⚠️  Preview content not yet indexed (attempt ${attempt + 1}/${RETRY_DELAYS_MS.length}). Retrying…`,
      );
    }
  }
  console.warn(
    `⚠️  Preview content not indexed after ${RETRY_DELAYS_MS.length} attempts; rendering placeholder. Last error:`,
    (lastError as { message?: string })?.message,
  );
  return { ok: false };
}

export async function Page({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  console.log('\n🎬 [PreviewPage] Route accessed');
  console.log('   searchParams:', JSON.stringify(resolvedSearchParams, null, 2));

  const client = new GraphClient(process.env.OPTIMIZELY_GRAPH_SINGLE_KEY!, {
    graphUrl: process.env.OPTIMIZELY_GRAPH_GATEWAY || undefined,
  });

  console.log('\n🔍 Calling client.getPreviewContent(...)');
  const result = await fetchPreviewWithRetry(
    client,
    resolvedSearchParams as PreviewParams,
  );

  const injectorScript = (
    <Script
      src={`${process.env.OPTIMIZELY_CMS_URL}/util/javascript/communicationinjector.js`}
    />
  );

  if (!result.ok) {
    return (
      <>
        {injectorScript}
        <PreviewComponent />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            fontFamily: 'system-ui, sans-serif',
            color: '#666',
          }}
        >
          <p>Updating preview…</p>
        </div>
      </>
    );
  }

  const response = result.response;

  console.log('\n📦 getPreviewContent response:');
  console.log('   __typename:', response?.__typename);
  console.log('   _id:', (response as { _id?: string })?._id);
  console.log('   _metadata:', JSON.stringify(response?._metadata, null, 2));
  console.log(
    '   top-level keys:',
    response ? Object.keys(response as object).join(', ') : '(no response)',
  );

  const composition = (response as { composition?: { nodes?: unknown[] } })?.composition;
  console.log('\n🧩 Composition:');
  console.log('   nodes count:', composition?.nodes?.length ?? 0);
  if (composition?.nodes?.length) {
    console.log('   nodes (full):', JSON.stringify(composition.nodes, null, 2));
  }

  console.log('\n📄 Full response JSON:');
  console.log(JSON.stringify(response, null, 2));

  return (
    <>
      {injectorScript}
      <PreviewComponent />
      <OptimizelyComponent content={response} />
    </>
  );
}

export default withAppContext(Page);
