// Re-export Sanity types
export * from './sanity';

// Keep existing block types for backward compatibility

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
