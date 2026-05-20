import { GraphClient, type PreviewParams, type ContentProps } from '@optimizely/cms-sdk';
import { withAppContext } from '@optimizely/cms-sdk/react/server';
import { PreviewComponent } from '@optimizely/cms-sdk/react/client';
import Script from 'next/script';
import OmniLandingPage from '@/components/OmniLandingPage';
import { OmniLandingPage as OmniLandingPageContentType } from '@/cms/content-types/OmniLandingPage';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function Page({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;

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
      <OmniLandingPage
        content={response as ContentProps<typeof OmniLandingPageContentType>}
      />
    </>
  );
}

export default withAppContext(Page);
