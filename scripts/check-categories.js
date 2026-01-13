const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: '1gge58ux',
    dataset: 'production',
    apiVersion: '2024-01-08',
    token: process.env.SANITY_WRITE_TOKEN || 'skhLFBF39wrIkos3zIAsb9pdQxWsusyTSx69aiQDJk9ZGJJIUXN6lARMPQ8nlX1O7dLFJVZJ08uELFGNG1yG8c8c3uy9OeeDj5MXktZC7GsRxvqdOOqAa88zsbnLnskJpH4dzoB8XNKZ7xrdVoaQAw9wBbWvFiROOSDlqOX7Rkdt3AbistHU',
    useCdn: false
});

async function checkCategories() {
    console.log('🔍 Checking project categories...\n');

    try {
        const query = `*[_type == "project"] | order(orderIndex asc) {
            title,
            projectTypes
        }`;

        const projects = await client.fetch(query);

        console.log('Projects and their categories:\n');
        projects.forEach(project => {
            const types = project.projectTypes ? project.projectTypes.join(', ') : 'NONE';
            console.log(`${project.title}: ${types}`);
        });

        // Extract all unique categories
        const allCategories = new Set();
        projects.forEach(project => {
            if (project.projectTypes && Array.isArray(project.projectTypes)) {
                project.projectTypes.forEach(type => allCategories.add(type));
            }
        });

        console.log('\n' + '='.repeat(60));
        console.log('Unique categories found in Sanity:');
        console.log('='.repeat(60));
        Array.from(allCategories).sort().forEach(cat => {
            console.log(`  - ${cat}`);
        });

        console.log('\n' + '='.repeat(60));
        console.log('Categories defined in schema but NOT used:');
        console.log('='.repeat(60));
        const schemaCategories = [
            'brand-identity',
            'uxui',
            'visual-design',
            'art-direction',
            'mobile-app',
            '3d-motion',
            'product-design',
            'advertising'
        ];

        schemaCategories.forEach(cat => {
            if (!allCategories.has(cat)) {
                console.log(`  ⚠️  ${cat} - NOT USED IN ANY PROJECT`);
            }
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

checkCategories();
