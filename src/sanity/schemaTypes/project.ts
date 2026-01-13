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
        })
    ],
})
