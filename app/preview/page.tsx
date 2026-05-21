import { GraphClient, type PreviewParams } from '@optimizely/cms-sdk';
import { OptimizelyComponent, withAppContext } from '@optimizely/cms-sdk/react/server';
import { PreviewComponent } from '@optimizely/cms-sdk/react/client';
import Script from 'next/script';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const LOCAL_PREVIEW_ORIGIN = 'http://localhost:3000';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function buildQueryString(
  params: { [key: string]: string | string[] | undefined },
): string {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string') qs.set(key, value);
    else if (Array.isArray(value)) value.forEach((v) => qs.append(key, v));
  }
  return qs.toString();
}

async function localPreviewReachable(): Promise<boolean> {
  try {
    const res = await fetch(`${LOCAL_PREVIEW_ORIGIN}/preview`, {
      method: 'HEAD',
      signal: AbortSignal.timeout(500),
      cache: 'no-store',
    });
    return res.status < 500;
  } catch {
    return false;
  }
}

export async function Page({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

  const requestHost = (await headers()).get('host') ?? '';
  const alreadyLocal =
    requestHost.startsWith('localhost:3000') ||
    requestHost.startsWith('127.0.0.1:3000');
  console.log('[preview] requestHost:', requestHost, 'alreadyLocal:', alreadyLocal);
  const shouldRedirectToLocal = !alreadyLocal && (await localPreviewReachable());
  console.log('[preview] localPreviewReachable →', shouldRedirectToLocal);
  if (shouldRedirectToLocal) {
    const qs = buildQueryString(resolvedSearchParams);
    const target = `${LOCAL_PREVIEW_ORIGIN}/preview${qs ? `?${qs}` : ''}`;
    console.log('[preview] redirecting to:', target);
    redirect(target);
  }

  console.log('\n🎬 [PreviewPage] Route accessed');
  console.log('   searchParams:', JSON.stringify(resolvedSearchParams, null, 2));

  const client = new GraphClient(process.env.OPTIMIZELY_GRAPH_SINGLE_KEY!, {
    graphUrl: process.env.OPTIMIZELY_GRAPH_GATEWAY || undefined,
  });

  console.log('\n🔍 Calling client.getPreviewContent(...)');
  const response = await client.getPreviewContent(
    resolvedSearchParams as PreviewParams,
  );

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
      <Script
        src={`${process.env.OPTIMIZELY_CMS_URL}/util/javascript/communicationinjector.js`}
      />
      <PreviewComponent />
      <OptimizelyComponent content={response} />
    </>
  );
}

export default withAppContext(Page);
