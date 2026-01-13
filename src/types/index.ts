export interface Project {
    _id: string;
    title: string;
    slug: { current: string };
    projectTypes: string[]; // Changed from projectType (single) to projectTypes (array)
    client?: string;
    mainImage?: any;
    description?: string;
    challenge?: string;
    approach?: string;
    solution?: string;
    images?: any[];
    brandColors?: string[];
    content?: Array<SanityBlock | SanityImageBlock>;
}

export type ProjectType =
    | 'brand-identity'
    | 'uxui'
    | 'visual-design'
    | 'art-direction'
    | 'mobile-app'
    | '3d-motion'
    | 'product-design'
    | 'advertising';

export interface SanityBlock {
    _type: 'block';
    _key: string;
    style?: string;
    children: Array<{
        _type: 'span';
        text: string;
        marks?: string[];
    }>;
}

export interface SanityImageBlock {
    _type: 'image';
    _key: string;
    asset: {
        _ref: string;
        _type: 'reference';
    };
    hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
    };
}
