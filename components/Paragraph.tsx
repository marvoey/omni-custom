import React from 'react';
import type { ContentProps } from '@optimizely/cms-sdk';
import { RichText } from '@optimizely/cms-sdk/react/richText';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import type { Paragraph as ParagraphContentType } from '@/cms/content-types/Paragraph';

type Props = {
  content: ContentProps<typeof ParagraphContentType>;
};

const Paragraph: React.FC<Props> = ({ content }) => {
  const { pa } = getPreviewUtils(content);
  if (!content.Text?.json) return null;
  return (
    <div
      {...pa('Text')}
      className="prose prose-lg max-w-3xl mx-auto text-stone-700 leading-relaxed font-light"
    >
      <RichText content={content.Text.json} />
    </div>
  );
};

export { Paragraph };
export default Paragraph;
