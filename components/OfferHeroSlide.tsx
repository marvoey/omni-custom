import Image from 'next/image';
import Link from 'next/link';
import type { ContentProps } from '@optimizely/cms-sdk';
import { getPreviewUtils } from '@optimizely/cms-sdk/react/server';
import type { OfferEntityV2 as OfferEntityV2ContentType } from '@/cms/content-types/OfferEntityV2';

type Props = {
  content: ContentProps<typeof OfferEntityV2ContentType>;
  priority?: boolean;
};

const OfferHeroSlide = ({ content, priority = false }: Props) => {
  const { pa } = getPreviewUtils(content);

  const heading = content.offerTitle ?? '';
  const description = content.shortTeaser ?? '';
  const backgroundImage =
    (content.HeroImage as { url?: { default?: string } } | undefined)?.url?.default ||
    (content.cardImage as { url?: { default?: string } } | undefined)?.url?.default ||
    '';
  const buttonText = content.ctaLabel ?? 'Learn More';
  const buttonLink =
    (content.ctaUrl as { default?: string } | undefined)?.default ?? '';

  return (
    <section className="relative flex h-[450px] w-full items-center justify-center overflow-hidden bg-gray-900 md:h-[600px]">
      <div className="absolute inset-0 z-0">
        {backgroundImage && (
          <Image
            {...pa('HeroImage')}
            src={backgroundImage}
            alt={heading}
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
        <h1
          {...pa('offerTitle')}
          className="mb-4 text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-6xl"
        >
          {heading}
        </h1>
        <p
          {...pa('shortTeaser')}
          className="mb-8 text-lg font-medium leading-relaxed text-gray-100 opacity-90 md:text-xl"
        >
          {description}
        </p>

        {buttonLink && (
          <Link
            href={buttonLink}
            className="inline-block rounded-sm bg-blue-600 px-8 py-3.5 text-lg font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
};

export default OfferHeroSlide;
