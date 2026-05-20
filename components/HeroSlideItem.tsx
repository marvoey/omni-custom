import Image from 'next/image';
import Link from 'next/link';
import type { ContentProps } from '@optimizely/cms-sdk';
import type { HeroSlideItem as HeroSlideItemContentType } from '@/cms/content-types/HeroSlideItem';

interface HeroSlideItemProps {
  heading?: string;
  description?: string;
  backgroundImage?: string;
  buttonLink?: string;
  buttonText?: string;
  priority?: boolean;
  content?: ContentProps<typeof HeroSlideItemContentType>;
}

function deriveFromContent(
  content: ContentProps<typeof HeroSlideItemContentType>,
): Omit<HeroSlideItemProps, 'priority' | 'content'> {
  const offer = ((content.targetOffer ?? {}) as Record<string, unknown>) as {
    offerTitle?: string;
    shortTeaser?: string;
    ctaLabel?: string;
    ctaUrl?: { default?: string };
    cardImage?: { url?: { default?: string } };
    HeroImage?: { url?: { default?: string } };
  };

  const backgroundImage =
    offer.HeroImage?.url?.default || offer.cardImage?.url?.default || '';

  return {
    heading: content.overrideTitle || offer.offerTitle || '',
    description: content.overrideTeaser || offer.shortTeaser || '',
    backgroundImage,
    buttonText: content.overrideCtaLabel || offer.ctaLabel || 'Learn More',
    buttonLink: offer.ctaUrl?.default || '#',
  };
}

const HeroSlideItem = ({
  heading,
  description,
  backgroundImage,
  buttonLink,
  buttonText,
  priority = false,
  content,
}: HeroSlideItemProps) => {
  const derived = content ? deriveFromContent(content) : null;
  const resolvedHeading = heading ?? derived?.heading ?? '';
  const resolvedDescription = description ?? derived?.description ?? '';
  const resolvedBackground = backgroundImage ?? derived?.backgroundImage ?? '';
  const resolvedButtonLink = buttonLink ?? derived?.buttonLink ?? '';
  const resolvedButtonText = buttonText ?? derived?.buttonText ?? '';

  return (
    <section className="relative flex h-[450px] w-full items-center justify-center overflow-hidden bg-gray-900 md:h-[600px]">
      <div className="absolute inset-0 z-0">
        {resolvedBackground && (
          <Image
            src={resolvedBackground}
            alt={resolvedHeading}
            fill
            priority={priority}
            className="object-cover"
            sizes="100vw"
          />
        )}
      </div>

      <div
        className="absolute inset-0 z-10 bg-black/40"
        aria-hidden="true"
      />

      <div className="relative z-20 flex max-w-4xl flex-col items-center px-6 text-center text-white">
        <h1 className="mb-4 text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-6xl">
          {resolvedHeading}
        </h1>
        <p className="mb-8 text-lg font-medium leading-relaxed text-gray-100 opacity-90 md:text-xl">
          {resolvedDescription}
        </p>

        {resolvedButtonLink && (
          <Link
            href={resolvedButtonLink}
            className="inline-block rounded-sm bg-blue-600 px-8 py-3.5 text-lg font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
          >
            {resolvedButtonText}
          </Link>
        )}
      </div>
    </section>
  );
};

export default HeroSlideItem;
