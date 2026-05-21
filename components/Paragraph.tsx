import React from 'react';
import type { ContentProps } from '@optimizely/cms-sdk';
import { RichText } from '@optimizely/cms-sdk/react/richText';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import type { Paragraph as ParagraphContentType } from '@/cms/content-types/Paragraph';

type Props = {
  content: ContentProps<typeof ParagraphContentType>;
  displaySettings?: Record<string, string | boolean>;
};

const ALIGNMENT_CLASSES: Record<string, string> = {
  full_width: 'max-w-none',
  centered_large: 'max-w-5xl mx-auto',
  centered_medium: 'max-w-3xl mx-auto',
  centered_small: 'max-w-xl mx-auto',
};

const Paragraph: React.FC<Props> = ({ content, displaySettings }) => {
  const { pa } = getPreviewUtils(content);
  if (!content.Text?.json) return null;

  const alignment = String(displaySettings?.paragraph_alignment ?? 'centered_medium');
  const widthClass = ALIGNMENT_CLASSES[alignment] ?? ALIGNMENT_CLASSES.centered_medium;

  return (
    <div
      {...pa('Text')}
      className={`prose prose-lg ${widthClass} text-stone-700 leading-relaxed font-light`}
    >
      <RichText content={content.Text.json} />
    </div>
  );
};

export { Paragraph };
export default Paragraph;
