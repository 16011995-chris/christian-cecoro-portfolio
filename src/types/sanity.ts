import { Image } from 'sanity';

export interface SanityImage extends Image {
  alt?: string;
  caption?: string;
  _type: 'image';
}

export interface YouTubeVideo {
  _type: 'youtubeVideo';
  url: string;
  title?: string;
}

export type GalleryItem = SanityImage | YouTubeVideo;

export interface ProjectSEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  orderIndex?: number;
  projectTypes: string[];
  client?: string;
  mainImage?: SanityImage | string; // Support both Sanity images and mock data strings
  gallery?: GalleryItem[];
  images?: SanityImage[]; // Legacy field - backward compatibility
  description?: string;
  challenge?: string;
  approach?: string;
  solution?: string;
  brandColors?: string[];
  content?: Array<any>; // Block content
  seo?: ProjectSEO;
}
