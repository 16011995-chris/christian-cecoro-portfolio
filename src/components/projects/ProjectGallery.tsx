'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { GalleryItem, SanityImage as SanityImageType } from '@/types/sanity';
import { urlForImage } from '@/sanity/lib/image';

interface ProjectGalleryProps {
  gallery?: GalleryItem[];
  images?: SanityImageType[]; // Legacy support
}

// Extract YouTube video ID from URL
function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^&?\s]+)/);
  return match ? match[1] : null;
}

// Type guard for YouTube video
function isYouTubeVideo(item: GalleryItem): item is { _type: 'youtubeVideo'; url: string; title?: string } {
  return item._type === 'youtubeVideo';
}

// Type guard for image
function isImage(item: GalleryItem): item is SanityImageType {
  return item._type === 'image' || !item._type; // Fallback for items without _type
}

export default function ProjectGallery({ gallery, images }: ProjectGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Use gallery if available, fallback to legacy images
  const items = gallery && gallery.length > 0 ? gallery : images || [];

  if (!items || items.length === 0) return null;

  // Filter only images for lightbox
  const imageItems = items.filter(isImage);

  // Prepare slides for lightbox (high quality)
  const slides = imageItems.map((img) => ({
    src: urlForImage(img).width(1920).quality(90).url(),
    alt: img.alt || 'Gallery image',
  }));

  // Get lightbox index for an image (accounting for videos in the list)
  const getLightboxIndex = (itemIndex: number): number => {
    let lightboxIdx = 0;
    for (let i = 0; i < itemIndex; i++) {
      if (isImage(items[i])) {
        lightboxIdx++;
      }
    }
    return lightboxIdx;
  };

  return (
    <section className="px-8 md:px-24 max-w-[1400px] mx-auto mb-32 relative z-10">
      {/* Single column layout with 16:9 aspect ratio */}
      <div className="flex flex-col gap-6">
        {items.map((item, i) => {
          if (isYouTubeVideo(item)) {
            const videoId = getYouTubeId(item.url);
            if (!videoId) return null;

            return (
              <div key={i} className="w-full">
                <div className="aspect-video w-full rounded-sm overflow-hidden bg-neutral-900">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={item.title || 'YouTube Video'}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {item.title && (
                  <p className="text-neutral-400 text-sm mt-2">{item.title}</p>
                )}
              </div>
            );
          }

          // Image item
          if (isImage(item)) {
            const thumbnailUrl = urlForImage(item)
              .width(1400)
              .height(788) // 16:9 ratio
              .quality(85)
              .url();

            return (
              <div
                key={i}
                className="relative cursor-pointer hover:opacity-90 transition-opacity group"
                onClick={() => {
                  setIndex(getLightboxIndex(i));
                  setOpen(true);
                }}
              >
                <div className="aspect-video relative overflow-hidden rounded-sm bg-neutral-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbnailUrl}
                    alt={item.alt || `Gallery Image ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {item.caption && (
                  <p className="text-neutral-400 text-sm mt-2">{item.caption}</p>
                )}
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* Lightbox - only for images */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        animation={{ fade: 300 }}
        controller={{ closeOnBackdropClick: true }}
      />
    </section>
  );
}
