import { client } from "@/sanity/lib/client";
import { MOCK_PROJECTS } from "./mockData";
import { Project } from "@/types";

const isDevelopment = process.env.NODE_ENV === 'development';
const useMockData = isDevelopment && !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export async function getProject(slug: string): Promise<Project | null> {
    if (useMockData) {
        console.warn("⚠️ Using mock data: Sanity Project ID not configured.");
        return MOCK_PROJECTS.find(p => p.slug.current === slug) || null;
    }

    try {
        const query = `*[_type == "project" && slug.current == $slug][0]{
            _id,
            title,
            slug,
            orderIndex,
            projectTypes,
            client,
            "mainImage": mainImage{
                asset->,
                alt,
                hotspot,
                crop
            },
            description,
            challenge,
            approach,
            solution,
            "gallery": gallery[]{
                _type,
                _type == "image" => {
                    asset->,
                    alt,
                    caption,
                    hotspot,
                    crop
                },
                _type == "youtubeVideo" => {
                    url,
                    title
                }
            },
            "images": images[]{
                asset->,
                alt,
                caption,
                hotspot,
                crop
            },
            brandColors,
            content,
            seo
        }`;

        const project = await client.fetch<Project>(query, { slug });

        if (!project) {
            console.warn(`Project "${slug}" not found in Sanity`);
            return null;
        }

        return project;
    } catch (error) {
        console.error("❌ Sanity fetch error (getProject):", error);

        // In production, throw error (don't fallback)
        if (process.env.NODE_ENV === 'production') {
            throw error;
        }

        // In development, fallback to mock
        console.warn("⚠️ Falling back to mock data");
        return MOCK_PROJECTS.find(p => p.slug.current === slug) || null;
    }
}

export async function getProjects(): Promise<Project[]> {
    if (useMockData) {
        console.warn("⚠️ Using mock data: Sanity Project ID not configured.");
        return MOCK_PROJECTS;
    }

    try {
        const query = `*[_type == "project"] | order(orderIndex asc) {
            _id,
            title,
            slug,
            orderIndex,
            projectTypes,
            "mainImage": mainImage{
                asset->,
                alt,
                hotspot,
                crop
            },
            description,
            client
        }`;

        const projects = await client.fetch<Project[]>(query);

        if (!projects || projects.length === 0) {
            console.warn("No projects found in Sanity");
            return [];
        }

        return projects;
    } catch (error) {
        console.error("❌ Sanity fetch error (getProjects):", error);

        // In production, return empty array
        if (process.env.NODE_ENV === 'production') {
            return [];
        }

        console.warn("⚠️ Falling back to mock data");
        return MOCK_PROJECTS;
    }
}

// Helper function to check connection
export async function checkSanityConnection(): Promise<boolean> {
    try {
        await client.fetch('*[_type == "project"][0]');
        return true;
    } catch {
        return false;
    }
}
