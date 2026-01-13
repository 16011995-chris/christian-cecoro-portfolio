const fs = require('fs');
const { createClient } = require('@sanity/client');

// Sanity client configuration
const client = createClient({
    projectId: '1gge58ux', // Your Sanity project ID
    dataset: 'production',
    apiVersion: '2024-01-08',
    token: process.env.SANITY_WRITE_TOKEN || 'skhLFBF39wrIkos3zIAsb9pdQxWsusyTSx69aiQDJk9ZGJJIUXN6lARMPQ8nlX1O7dLFJVZJ08uELFGNG1yG8c8c3uy9OeeDj5MXktZC7GsRxvqdOOqAa88zsbnLnskJpH4dzoB8XNKZ7xrdVoaQAw9wBbWvFiROOSDlqOX7Rkdt3AbistHU',
    useCdn: false
});

// Mapping from CSV types to Sanity slugs
const typeMapping = {
    'Art Direction': 'art-direction',
    'Visual Design': 'visual-design',
    'UX/UI': 'uxui',
    'Brand Identity': 'brand-identity',
    'Mobile App': 'mobile-app',
    '3D Motion': '3d-motion',
    'Product Design': 'product-design',
    'ADV': 'advertising'
};

// Function to map CSV project types to Sanity slugs
function mapProjectTypes(csvType) {
    if (!csvType) return ['brand-identity']; // Default fallback

    // Split by "/" and map each type
    const types = csvType.split('/').map(t => t.trim());
    const mappedTypes = types
        .map(type => typeMapping[type])
        .filter(Boolean); // Remove undefined values

    return mappedTypes.length > 0 ? mappedTypes : ['brand-identity'];
}

// Function to create URL-safe slug from title
function createSlug(title) {
    return title
        .toLowerCase()
        .normalize('NFD') // Normalize unicode characters
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with dash
        .replace(/(^-|-$)/g, ''); // Remove leading/trailing dashes
}

// Parse CSV content
function parseCSV(csvContent) {
    const lines = csvContent.split('\n');
    const projects = [];

    // Skip header (line 0) and process data lines
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const values = line.split(';');
        if (values.length < 5) continue;

        projects.push({
            ID: values[0],
            TITOLO: values[1],
            TIPO_PROGETTO: values[2],
            CLIENTE: values[3],
            DESCRIZIONE_PROGETTO: values[4]
        });
    }

    return projects;
}

// Main import function
async function importProjects() {
    console.log('🚀 Starting Sanity import...\n');

    // Check if token is configured
    if (!client.config().token || client.config().token === 'YOUR_WRITE_TOKEN_HERE') {
        console.error('❌ Error: SANITY_WRITE_TOKEN not configured!');
        console.log('\nTo fix this:');
        console.log('1. Go to https://sanity.io/manage');
        console.log('2. Select project "1gge58ux"');
        console.log('3. Go to API → Tokens');
        console.log('4. Create a new token with "Editor" permissions');
        console.log('5. Set environment variable: set SANITY_WRITE_TOKEN=your_token_here');
        console.log('6. Or edit this file and replace YOUR_WRITE_TOKEN_HERE\n');
        process.exit(1);
    }

    // Read CSV file
    const csvPath = 'C:\\Users\\chris\\Desktop\\Sito mio\\progetti-christian-cecoro-SEMPLIFICATO.csv';

    if (!fs.existsSync(csvPath)) {
        console.error(`❌ CSV file not found: ${csvPath}`);
        process.exit(1);
    }

    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const projects = parseCSV(csvContent);

    console.log(`📊 Found ${projects.length} projects in CSV\n`);

    let successCount = 0;
    let errorCount = 0;

    // Import each project
    for (const project of projects) {
        try {
            const sanityDoc = {
                _type: 'project',
                title: project.TITOLO,
                slug: {
                    _type: 'slug',
                    current: createSlug(project.TITOLO)
                },
                projectTypes: mapProjectTypes(project.TIPO_PROGETTO),
                client: project.CLIENTE,
                description: project.DESCRIZIONE_PROGETTO,
                // These will be populated manually later or via another script
                challenge: '',
                approach: '',
                solution: '',
                mainImage: null,
                brandColors: [],
                content: []
            };

            console.log(`📝 Importing: ${project.TITOLO}`);
            console.log(`   Types: ${sanityDoc.projectTypes.join(', ')}`);
            console.log(`   Slug: ${sanityDoc.slug.current}`);

            const result = await client.create(sanityDoc);
            console.log(`   ✅ Created with ID: ${result._id}\n`);

            successCount++;
        } catch (error) {
            console.error(`   ❌ Error importing "${project.TITOLO}":`, error.message);
            errorCount++;
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`✅ Import completed!`);
    console.log(`   Success: ${successCount}`);
    console.log(`   Errors: ${errorCount}`);
    console.log('='.repeat(50) + '\n');

    if (successCount > 0) {
        console.log('🎉 Projects are now available in Sanity Studio!');
        console.log('   View them at: https://christiancecoro.com/studio\n');
    }
}

// Run the import
importProjects().catch(error => {
    console.error('\n❌ Fatal error during import:', error);
    process.exit(1);
});
