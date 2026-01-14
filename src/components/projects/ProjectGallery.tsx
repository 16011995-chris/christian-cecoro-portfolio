'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { SanityImage as SanityImageType } from '@/types/sanity';
import { urlForImage } from '@/sanity/lib/image';

interface ProjectGalleryProps {
  images: SanityImageType[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  // Prepare slides for lightbox (alta qualità)
  const slides = images.map((img) => ({
    src: urlForImage(img).width(1920).quality(90).url(),
    alt: img.alt || 'Gallery image',
  }));

  return (
    <section className="px-8 md:px-24 max-w-[1400px] mx-auto mb-32 relative z-10">
      {/* Grid 2 colonne */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((img, i) => {
          const thumbnailUrl = urlForImage(img)
            .width(800)
            .height(800)
            .quality(80)
            .url();

          return (
            <div
              key={i}
              className="relative cursor-pointer hover:opacity-90 transition-opacity group"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            >
              <div className="aspect-square relative overflow-hidden rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumbnailUrl}
                  alt={img.alt || `Gallery Image ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
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
