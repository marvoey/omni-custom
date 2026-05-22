import Image from 'next/image';
import Link from 'next/link';
import type { ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import type { RoomCard as RoomCardContentType } from '@/cms/content-types/RoomCard';

type CmsLink = { title?: string; text?: string; url?: { default?: string } };

interface RoomCardProps {
  content: ContentProps<typeof RoomCardContentType>;
}

const RoomCard = ({ content }: RoomCardProps) => {
  const { pa } = getPreviewUtils(content);

  const photo = (content.Photo ?? null) as { url?: { default?: string } } | null;
  const learnMore = (content.LearnMoreLink ?? null) as CmsLink | null;
  const bookNow = (content.BookNowLink ?? null) as CmsLink | null;

  const photoUrl = photo?.url?.default ?? '';
  const title = content.Title ?? '';
  const description = content.Description ?? '';

  const learnMoreUrl = learnMore?.url?.default ?? '';
  const learnMoreLabel = learnMore?.title || learnMore?.text || 'Learn More';
  const bookNowUrl = bookNow?.url?.default ?? '';
  const bookNowLabel = bookNow?.title || bookNow?.text || 'Book Now';

  return (
    <div className="bg-white rounded-sm shadow-md overflow-hidden hover:-translate-y-2 transition-transform duration-300 border border-gray-200 h-full flex flex-col">
      <div className="relative h-64 bg-gray-200">
        {photoUrl && (
          <Image
            src={photoUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            {...pa('Photo')}
          />
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 {...pa('Title')} className="text-xl font-bold text-[#002D72] mb-3">
          {title}
        </h3>
        <p
          {...pa('Description')}
          className="text-gray-600 text-sm leading-relaxed mb-6 flex-1"
        >
          {description}
        </p>
        <div className="flex flex-wrap gap-3 mt-auto">
          {learnMoreUrl && (
            <Link
              href={learnMoreUrl}
              {...pa('LearnMoreLink')}
              className="bg-white border border-[#002D72] text-[#002D72] hover:bg-[#002D72] hover:text-white px-6 py-2 text-xs uppercase tracking-widest transition-colors duration-300 rounded-sm"
            >
              {learnMoreLabel}
            </Link>
          )}
          {bookNowUrl && (
            <Link
              href={bookNowUrl}
              {...pa('BookNowLink')}
              className="bg-[#002D72] hover:bg-[#C5A059] text-white px-6 py-2 text-xs uppercase tracking-widest transition-colors duration-300 rounded-sm"
            >
              {bookNowLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
