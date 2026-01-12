export interface Project {
    _id: string;
    title: string;
    slug: { current: string };
    projectType: string;
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

export type ProjectType = 'branding' | 'uxui' | 'social';

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
