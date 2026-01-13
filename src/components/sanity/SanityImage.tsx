import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import { SanityImage as SanityImageType } from '@/types/sanity';

interface SanityImageProps {
  image: SanityImageType;
  alt?: string; // Override alt text
  width?: number;
  height?: number;
  quality?: number;
  className?: string;
  priority?: boolean;
}

export default function SanityImage({
  image,
  alt,
  width = 1200,
  height = 800,
  quality = 90,
  className = '',
  priority = false,
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
    <Image
      src={imageUrl}
      alt={alt || image.alt || 'Project image'}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
