import Image from 'next/image';
import Link from 'next/link';
 
interface HeroSlideItemProps {
  heading: string;
  description: string;
  backgroundImage: string; // URL from Content Delivery API / Graph
  buttonLink: string;      // URL from Content Delivery API / Graph
  buttonText: string;
  priority?: boolean;      // Pass true if this is the first slide for LCP optimization
}
 
const HeroSlideItem = ({
  heading,
  description,
  backgroundImage,
  buttonLink,
  buttonText,
  priority = false,
}: HeroSlideItemProps) => {
  return (
<section className="relative flex h-[450px] w-full items-center justify-center overflow-hidden bg-gray-900 md:h-[600px]">
      {/* 
        Background Image: 
        Uses next/image for automatic WebP conversion, resizing, and lazy loading.
      */}
<div className="absolute inset-0 z-0">
<Image
          src={backgroundImage}
          alt={heading}
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
        />
</div>
 
      {/* Dark Overlay for Text Contrast */}
<div 
        className="absolute inset-0 z-10 bg-black/40" 
        aria-hidden="true" 
      />
 
      {/* Content Area */}
<div className="relative z-20 flex max-w-4xl flex-col items-center px-6 text-center text-white">
<h1 className="mb-4 text-3xl font-extrabold uppercase leading-tight tracking-tight md:text-6xl">
          {heading}
</h1>
<p className="mb-8 text-lg font-medium leading-relaxed text-gray-100 opacity-90 md:text-xl">
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
 
export default HeroSlideItem;