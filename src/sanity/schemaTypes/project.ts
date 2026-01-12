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
            name: 'projectType',
            title: 'Project Type (Automation Trigger)',
            description: 'Select the type to trigger the automatic layout: Branding = Visual focus, UX/UI = Process focus.',
            type: 'string',
            options: {
                list: [
                    { title: 'Brand Identity', value: 'branding' },
                    { title: 'UX/UI Design', value: 'uxui' },
                    { title: 'Social Media', value: 'social' },
                ],
                layout: 'radio'
            },
            initialValue: 'branding',
            validation: (rule) => rule.required(),
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
            of: [{ type: 'string' }], // In real app, create a 'color' object type
            hidden: ({ document }) => document?.projectType !== 'branding',
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
