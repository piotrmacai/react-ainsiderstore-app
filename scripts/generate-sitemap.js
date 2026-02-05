/**
 * Sitemap Generator for Ainsider Store
 * 
 * Fetches all tools from Supabase and generates a sitemap.xml file
 * Run with: npm run sitemap
 */

import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Supabase configuration
const supabaseUrl = 'https://zltkgdjyfzojirmppbex.supabase.co';
const supabaseAnonKey = 'sb_publishable_ARsRgAYn1dpCuEOgtC0c1Q_XwMTUjBY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BASE_URL = 'https://ainsider.store';

// Slugify function (same as in the app)
function slugify(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Create tool slug with duplicate handling
function createToolSlugByName(name, tools, toolId) {
    const baseSlug = slugify(name);
    const duplicates = tools.filter(t => slugify(t.name) === baseSlug);

    if (duplicates.length <= 1) {
        return baseSlug;
    }

    const sortedDuplicates = [...duplicates].sort((a, b) => a.id - b.id);
    const index = sortedDuplicates.findIndex(t => t.id === toolId);

    return index === 0 ? baseSlug : `${baseSlug}-${index + 1}`;
}

async function generateSitemap() {
    console.log('🚀 Fetching tools from Supabase...');

    // Fetch all tools
    const { data: tools, error } = await supabase
        .from('ainsider_store_directory')
        .select('*')
        .order('created', { ascending: false });

    if (error) {
        console.error('❌ Error fetching tools:', error.message);
        process.exit(1);
    }

    console.log(`✅ Fetched ${tools.length} tools`);

    // Fetch prompts
    const { data: prompts, error: promptsError } = await supabase
        .from('ainsider_prompts')
        .select('*')
        .order('date', { ascending: false });

    if (promptsError) {
        console.warn('⚠️ Could not fetch prompts:', promptsError.message);
    }

    const today = new Date().toISOString().split('T')[0];

    // Static pages
    const staticPages = [
        { url: '/', priority: '1.0', changefreq: 'daily' },
        { url: '/tools', priority: '0.9', changefreq: 'daily' },
        { url: '/prompts', priority: '0.9', changefreq: 'daily' },
        { url: '/blog', priority: '0.7', changefreq: 'weekly' },
    ];

    // Generate tool URLs
    const toolUrls = tools.map(tool => ({
        url: `/tools/${createToolSlugByName(tool.name, tools, tool.id)}`,
        priority: '0.8',
        changefreq: 'weekly',
        lastmod: tool.created ? tool.created.split('T')[0] : today,
    }));

    // Generate prompt URLs (if available)
    const promptUrls = (prompts || []).map(prompt => ({
        url: `/prompts/${slugify(prompt.name)}-${prompt.id}`,
        priority: '0.7',
        changefreq: 'weekly',
        lastmod: prompt.date ? prompt.date.split('T')[0] : today,
    }));

    // Combine all URLs
    const allUrls = [...staticPages, ...toolUrls, ...promptUrls];

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${page.lastmod || today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    // Write to public directory
    const outputPath = join(__dirname, '..', 'public', 'sitemap.xml');
    writeFileSync(outputPath, xml);

    console.log(`✅ Sitemap generated with ${allUrls.length} URLs`);
    console.log(`📁 Saved to: ${outputPath}`);
}

generateSitemap().catch(console.error);
