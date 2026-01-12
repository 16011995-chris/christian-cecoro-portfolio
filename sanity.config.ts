'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { NanobananaAction } from './src/sanity/actions/nanobananaAction'

export default defineConfig({
    basePath: '/studio',
    projectId: projectId || 'dummy-project-id', // Fallback for dev without env
    dataset: dataset || 'production',
    schema,
    document: {
        actions: (prev, context) => {
            return context.schemaType === 'project'
                ? [...prev, NanobananaAction]
                : prev;
        },
    },
    plugins: [
        structureTool(),
        visionTool({ defaultApiVersion: apiVersion }),
    ],
})
