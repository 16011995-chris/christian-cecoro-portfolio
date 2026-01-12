export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-08';

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

export const useCdn = process.env.NODE_ENV === 'production';

function assertValue<T>(value: T | undefined, errorMessage: string): T {
    if (value === undefined) {
        // Throw only in production
        if (process.env.NODE_ENV === 'production') {
            throw new Error(errorMessage);
        }
        console.warn(`⚠️ ${errorMessage}`);
        return '' as T;
    }
    return value;
}
