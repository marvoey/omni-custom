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
  const client = new GraphClient(process.env.OPTIMIZELY_GRAPH_SINGLE_KEY!, {
    graphUrl: process.env.OPTIMIZELY_GRAPH_GATEWAY || undefined,
  });

  const response = await client.getPreviewContent(
    (await searchParams) as PreviewParams,
  );

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
