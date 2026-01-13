export function formatCategoryName(slug: string): string {
    const categoryNames: Record<string, string> = {
        'brand-identity': 'Brand Identity',
        'uxui': 'UX/UI Design',
        'visual-design': 'Visual Design',
        'art-direction': 'Art Direction',
        'mobile-app': 'Mobile App',
        '3d-motion': '3D Motion',
        'product-design': 'Product Design',
        'advertising': 'Advertising'
    };

    return categoryNames[slug] || slug.replace(/-/g, ' ');
}
