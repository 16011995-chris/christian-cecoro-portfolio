import { Image } from 'sanity';

export interface SanityImage extends Image {
  alt?: string;
  caption?: string;
  _type: 'image';
}

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
  images?: SanityImage[];
  description?: string;
  challenge?: string;
  approach?: string;
  solution?: string;
  brandColors?: string[];
  content?: Array<any>; // Block content - può rimanere any
  seo?: ProjectSEO;
}
