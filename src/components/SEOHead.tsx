import { Helmet } from 'react-helmet-async';
import { Tool } from '@/lib/supabase';

interface SEOHeadProps {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
    type?: string;
    tool?: Tool;
}

const BASE_URL = 'https://ainsider.store';
const DEFAULT_IMAGE = `${BASE_URL}/images/img.png`;
const SITE_NAME = 'Ainsider Store';

export function SEOHead({
    title,
    description,
    url,
    image = DEFAULT_IMAGE,
    type = 'website',
    tool,
}: SEOHeadProps) {
    // Generate tool-specific SEO data if tool is provided
    const pageTitle = tool
        ? `${tool.name} - AI Tool | ${SITE_NAME}`
        : title
            ? `${title} | ${SITE_NAME}`
            : `${SITE_NAME} - AI Agents, Tools and Prompts Directory`;

    const pageDescription = tool
        ? tool.description || `Discover ${tool.name} - an AI tool featured on Ainsider Store.`
        : description || 'Discover the best AI agents, tools, models, and prompts for LLMs.';

    const pageUrl = url || BASE_URL;
    const canonicalUrl = pageUrl.startsWith('http') ? pageUrl : `${BASE_URL}${pageUrl}`;

    // Generate JSON-LD structured data for tools
    const toolStructuredData = tool
        ? {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: tool.name,
            description: tool.description || `${tool.name} - AI tool`,
            url: canonicalUrl,
            applicationCategory: tool.categories?.[0] || 'AI Tool',
            operatingSystem: 'Web',
            offers: {
                '@type': 'Offer',
                price: tool.tags === 'Free' ? '0' : undefined,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
            },
            aggregateRating: undefined, // Can be added if ratings are available
            publisher: {
                '@type': 'Organization',
                name: SITE_NAME,
                url: BASE_URL,
            },
        }
        : null;

    // BreadcrumbList structured data for tools
    const breadcrumbData = tool
        ? {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: BASE_URL,
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'AI Tools',
                    item: `${BASE_URL}/tools`,
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: tool.name,
                    item: canonicalUrl,
                },
            ],
        }
        : null;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{pageTitle}</title>
            <meta name="title" content={pageTitle} />
            <meta name="description" content={pageDescription} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={tool ? 'product' : type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />
            <meta name="twitter:image" content={image} />

            {/* Tool-specific meta */}
            {tool?.categories && (
                <meta name="keywords" content={`${tool.name}, ${tool.categories.join(', ')}, AI tool, ${tool.tags || ''}`} />
            )}

            {/* JSON-LD Structured Data for Tool */}
            {toolStructuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(toolStructuredData)}
                </script>
            )}

            {/* Breadcrumb Structured Data */}
            {breadcrumbData && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbData)}
                </script>
            )}
        </Helmet>
    );
}
