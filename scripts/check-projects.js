const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: '1gge58ux',
    dataset: 'production',
    apiVersion: '2024-01-08',
    token: process.env.SANITY_WRITE_TOKEN || 'skhLFBF39wrIkos3zIAsb9pdQxWsusyTSx69aiQDJk9ZGJJIUXN6lARMPQ8nlX1O7dLFJVZJ08uELFGNG1yG8c8c3uy9OeeDj5MXktZC7GsRxvqdOOqAa88zsbnLnskJpH4dzoB8XNKZ7xrdVoaQAw9wBbWvFiROOSDlqOX7Rkdt3AbistHU',
    useCdn: false
});

async function checkProjects() {
    console.log('🔍 Checking projects in Sanity...\n');

    try {
        const query = `*[_type == "project"] | order(orderIndex asc) {
            _id,
            title,
            orderIndex,
            projectTypes,
            _createdAt
        }`;

        const projects = await client.fetch(query);

        console.log(`📊 Found ${projects.length} projects\n`);
        console.log('Order | Title | orderIndex | Created At');
        console.log('-'.repeat(80));

        projects.forEach((project, index) => {
            const orderIdx = project.orderIndex || 'NULL';
            const date = new Date(project._createdAt).toLocaleString();
            console.log(`${index + 1}. ${project.title.padEnd(30)} | ${String(orderIdx).padEnd(3)} | ${date}`);
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

checkProjects();
