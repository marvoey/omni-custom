import { ContentProps } from '@optimizely/cms-sdk';
import {
  ComponentContainerProps,
  OptimizelyComposition,
  getPreviewUtils,
} from '@optimizely/cms-sdk/react/server';
import { OmniLandingPage as OmniLandingPageContentType } from '@/cms/content-types/OmniLandingPage';

type Props = {
  content: ContentProps<typeof OmniLandingPageContentType>;
};

function ComponentWrapper({ children, node }: ComponentContainerProps) {
  const { pa } = getPreviewUtils(node);
  return <div {...pa(node)}>{children}</div>;
}

export default function OmniLandingPage({ content }: Props) {
  return (
    <main>
      <OptimizelyComposition
        nodes={content.composition?.nodes ?? []}
        ComponentWrapper={ComponentWrapper}
      />
    </main>
  );
}
