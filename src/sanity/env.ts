export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-08';

export const dataset = assertValue(
    process.env.NEXT_PUBLIC_SANITY_DATASET,
    'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
);

export const projectId = assertValue(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
) || 'placeholder';

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
