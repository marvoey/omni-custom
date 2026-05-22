import type { ContentProps } from '@optimizely/cms-sdk';
import RoomCard from './RoomCard';
import RoomCarouselTrack from './RoomCarouselTrack';
import type { RoomCarouselSection as RoomCarouselSectionContentType } from '@/cms/content-types/RoomCarouselSection';
import type { RoomCard as RoomCardContentType } from '@/cms/content-types/RoomCard';

type RoomCardContent = ContentProps<typeof RoomCardContentType>;

interface RoomCarouselProps {
  content?: ContentProps<typeof RoomCarouselSectionContentType> | null;
}

const propertyAttrs = (name: string) => ({ 'data-epi-property-name': name });
const blockAttrs = (key: string | undefined) =>
  key ? { 'data-epi-block-id': key } : {};

export default function RoomCarousel({ content }: RoomCarouselProps) {
  if (!content) return null;

  const rawCards = (content?.CardsLink ?? []) as unknown as (RoomCardContent | null | undefined)[];
  const cards = rawCards.filter((c): c is RoomCardContent => Boolean(c));
  const heading = content?.Heading ?? '';
  const introHtml = ((): string => {
    const intro = content?.IntroText as unknown;
    if (intro && typeof intro === 'object') {
      return (intro as { html?: string }).html ?? '';
    }
    return typeof intro === 'string' ? intro : '';
  })();

  const headerBlock = (
    <div className="text-center mb-12">
      {heading && (
        <h2
          {...propertyAttrs('Heading')}
          className="text-4xl md:text-5xl text-[#002D72] uppercase tracking-widest mb-4 font-bold"
        >
          {heading}
        </h2>
      )}
      {introHtml && (
        <div
          {...propertyAttrs('IntroText')}
          className="text-gray-600 italic text-lg"
          dangerouslySetInnerHTML={{ __html: introHtml }}
        />
      )}
    </div>
  );

  if (cards.length === 0) {
    return (
      <div className="bg-[#F4F1EA] py-16 px-4 font-serif">
        <div className="max-w-7xl mx-auto">{headerBlock}</div>
      </div>
    );
  }

  const slides = cards.map((card, idx) => {
    const cardKey = (card?._metadata?.key as string | undefined) ?? `card-${idx}`;
    return (
      <div key={cardKey} {...blockAttrs(card?._metadata?.key as string | undefined)}>
        <RoomCard content={card} />
      </div>
    );
  });

  return (
    <div className="bg-[#F4F1EA] py-16 px-4 font-serif">
      <div className="max-w-7xl mx-au to">
        {headerBlock}
        <div {...propertyAttrs('CardsLink')} >
          <RoomCarouselTrack {...propertyAttrs('CardsLink')} slides={slides} />
        </div>
      </div>
    </div>
  );
}
