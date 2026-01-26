import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'orderIndex',
            title: 'Order Index',
            type: 'number',
            description: 'Used to maintain custom project order. Lower numbers appear first.',
            validation: (rule) => rule.required().min(1),
        }),
        defineField({
            name: 'projectTypes',
            title: 'Project Types',
            description: 'Select one or more types that describe this project.',
            type: 'array',
            of: [
                {
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Brand Identity', value: 'brand-identity' },
                            { title: 'UX/UI Design', value: 'uxui' },
                            { title: 'Visual Design', value: 'visual-design' },
                            { title: 'Art Direction', value: 'art-direction' },
                            { title: 'Mobile App', value: 'mobile-app' },
                            { title: '3D Motion', value: '3d-motion' },
                            { title: 'Product Design', value: 'product-design' },
                            { title: 'Advertising', value: 'advertising' },
                        ],
                    }
                }
            ],
            validation: (rule) => rule.required().min(1).max(5),
        }),

        // --- Common Fields ---
        defineField({
            name: 'mainImage',
            title: 'Main Image (Hero)',
            type: 'image',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alt Text',
                    validation: (rule) => rule.required(),
                },
            ],
        }),
        defineField({
            name: 'gallery',
            title: 'Project Gallery',
            type: 'array',
            description: 'Add images or YouTube videos. Max 20 items.',
            of: [
                {
                    type: 'image',
                    name: 'galleryImage',
                    title: 'Image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alt Text (Required)',
                            description: 'Describe the image for accessibility and SEO.',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'caption',
                            type: 'text',
                            title: 'Caption (Optional)',
                            rows: 2,
                        },
                    ],
                },
                {
                    type: 'object',
                    name: 'youtubeVideo',
                    title: 'YouTube Video',
                    fields: [
                        {
                            name: 'url',
                            type: 'url',
                            title: 'YouTube URL',
                            description: 'Paste the full YouTube video URL',
                            validation: (rule) => rule.required(),
                        },
                        {
                            name: 'title',
                            type: 'string',
                            title: 'Video Title (Optional)',
                        },
                    ],
                    preview: {
                        select: { title: 'title', url: 'url' },
                        prepare({ title, url }) {
                            return {
                                title: title || 'YouTube Video',
                                subtitle: url,
                                media: () => '🎬'
                            };
                        },
                    },
                },
            ],
            validation: (rule) => rule.max(20),
        }),
        // Legacy field - keep for backward compatibility
        defineField({
            name: 'images',
            title: 'Legacy Images (Deprecated)',
            type: 'array',
            hidden: true,
            of: [{
                type: 'image',
                options: { hotspot: true },
                fields: [
                    { name: 'alt', type: 'string', title: 'Alt Text' },
                    { name: 'caption', type: 'text', title: 'Caption', rows: 2 },
                ],
            }],
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'client',
            title: 'Client / Commission',
            type: 'string',
        }),

        // --- Branding Specific Automation Data ---
        defineField({
            name: 'brandColors',
            title: 'Brand Palette',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Add brand colors (hex codes). Typically shown for Brand Identity projects.',
        }),

        // --- UX/UI Specific Automation Data ---
        defineField({
            name: 'challenge',
            title: 'The Challenge',
            type: 'text',
        }),
        defineField({
            name: 'approach',
            title: 'The Approach',
            type: 'text',
        }),
        defineField({
            name: 'solution',
            title: 'The Solution',
            type: 'text',
        }),

        // --- Content Blocks (Flexible) ---
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image' }
            ]
        }),

        // --- SEO Settings ---
        defineField({
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            description: 'Override default SEO metadata for this project.',
            fields: [
                {
                    name: 'metaTitle',
                    type: 'string',
                    title: 'Meta Title',
                    validation: (rule) => rule.max(60),
                },
                {
                    name: 'metaDescription',
                    type: 'text',
                    title: 'Meta Description',
                    rows: 3,
                    validation: (rule) => rule.max(160),
                },
                {
                    name: 'ogImage',
                    type: 'image',
                    title: 'Social Share Image (Open Graph)',
                    description: 'Recommended size: 1200x630px',
                },
            ],
        })
    ],
})
