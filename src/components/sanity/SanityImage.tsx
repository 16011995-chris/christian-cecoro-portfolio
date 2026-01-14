import { urlForImage } from '@/sanity/lib/image';
import { SanityImage as SanityImageType } from '@/types/sanity';

interface SanityImageProps {
  image: SanityImageType;
  alt?: string; // Override alt text
  width?: number;
  height?: number;
  quality?: number;
  className?: string;
}

export default function SanityImage({
  image,
  alt,
  width = 1200,
  height = 800,
  quality = 90,
  className = '',
}: SanityImageProps) {
  if (!image || !image.asset) {
    return null;
  }

  const imageUrl = urlForImage(image)
    .width(width)
    .height(height)
    .quality(quality)
    .auto('format') // WebP/AVIF automatico
    .url();

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageUrl}
      alt={alt || image.alt || 'Project image'}
      width={width}
      height={height}
      className={className}
    />
  );
}
