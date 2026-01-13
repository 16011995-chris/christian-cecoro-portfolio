const { createClient } = require('@sanity/client');

// Sanity client configuration
const client = createClient({
    projectId: '1gge58ux',
    dataset: 'production',
    apiVersion: '2024-01-08',
    token: process.env.SANITY_WRITE_TOKEN || 'skhLFBF39wrIkos3zIAsb9pdQxWsusyTSx69aiQDJk9ZGJJIUXN6lARMPQ8nlX1O7dLFJVZJ08uELFGNG1yG8c8c3uy9OeeDj5MXktZC7GsRxvqdOOqAa88zsbnLnskJpH4dzoB8XNKZ7xrdVoaQAw9wBbWvFiROOSDlqOX7Rkdt3AbistHU',
    useCdn: false
});

async function deleteAllProjects() {
    console.log('🗑️  Fetching all projects...\n');

    try {
        // Fetch all project IDs
        const projects = await client.fetch('*[_type == "project"]{ _id, title }');

        if (projects.length === 0) {
            console.log('✅ No projects found to delete.\n');
            return;
        }

        console.log(`📊 Found ${projects.length} projects to delete:\n`);
        projects.forEach(p => console.log(`   - ${p.title} (${p._id})`));

        console.log('\n🔥 Deleting projects...\n');

        // Delete all projects
        for (const project of projects) {
            await client.delete(project._id);
            console.log(`   ✅ Deleted: ${project.title}`);
        }

        console.log('\n' + '='.repeat(50));
        console.log(`✅ Successfully deleted ${projects.length} projects!`);
        console.log('='.repeat(50) + '\n');

    } catch (error) {
        console.error('\n❌ Error deleting projects:', error.message);
        process.exit(1);
    }
}

// Run the deletion
deleteAllProjects().catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
});
