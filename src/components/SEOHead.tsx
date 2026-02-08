import { Helmet } from 'react-helmet-async';
import { Tool, Prompt } from '@/lib/supabase';
import { DocArticle } from '@/data/docsData';

interface SEOHeadProps {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
    type?: string;
    tool?: Tool;
    article?: DocArticle;
    prompt?: Prompt;
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
    article,
    prompt,
}: SEOHeadProps) {
    // Generate page title
    let pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - AI Agents, Tools and Prompts Directory`;

    if (tool) {
        pageTitle = `${tool.name} - AI Tool | ${SITE_NAME}`;
    } else if (article) {
        pageTitle = `${article.title} - AI Documentation | ${SITE_NAME}`;
    } else if (prompt) {
        pageTitle = `${prompt.name} - AI Prompt | ${SITE_NAME}`;
    }

    // Generate page description
    let pageDescription = description || 'Discover the best AI agents, tools, models, and prompts for LLMs.';

    if (tool) {
        pageDescription = tool.description || `Discover ${tool.name} - an AI tool featured on Ainsider Store.`;
    } else if (article) {
        pageDescription = article.description || `Read about ${article.title} in our AI documentation.`;
    } else if (prompt) {
        pageDescription = prompt.description || `Get the best AI prompt for ${prompt.name}.`;
    }

    const pageUrl = url || BASE_URL;
    const canonicalUrl = pageUrl.startsWith('http') ? pageUrl : `${BASE_URL}${pageUrl}`;

    // Generate JSON-LD structured data
    let structuredData: any = null;
    let breadcrumbData: any = null;

    if (tool) {
        structuredData = {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: tool.name,
            description: tool.description || `${tool.name} - AI tool`,
            url: canonicalUrl,
            applicationCategory: tool.categories?.[0] || 'AI Tool',
            operatingSystem: 'Web',
            offers: {
                '@type': 'Offer',
                price: tool.tags?.includes('Free') ? '0' : undefined,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
            },
            publisher: {
                '@type': 'Organization',
                name: SITE_NAME,
                url: BASE_URL,
            },
        };

        breadcrumbData = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: 'AI Tools', item: `${BASE_URL}/tools` },
                { '@type': 'ListItem', position: 3, name: tool.name, item: canonicalUrl },
            ],
        };
    } else if (article) {
        structuredData = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.description,
            image: image,
            author: {
                '@type': 'Organization',
                name: SITE_NAME,
            },
            publisher: {
                '@type': 'Organization',
                name: SITE_NAME,
                logo: {
                    '@type': 'ImageObject',
                    url: DEFAULT_IMAGE,
                },
            },
            datePublished: new Date().toISOString(), // In a real app, this should be the actual date
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': canonicalUrl,
            },
        };

        breadcrumbData = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: 'Documentation', item: `${BASE_URL}/docs` },
                { '@type': 'ListItem', position: 3, name: article.title, item: canonicalUrl },
            ],
        };
    } else if (prompt) {
        structuredData = {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork', // Or 'TechArticle' or custom type
            name: prompt.name,
            description: prompt.description,
            url: canonicalUrl,
            keywords: prompt.category?.join(', '),
            publisher: {
                '@type': 'Organization',
                name: SITE_NAME,
                url: BASE_URL,
            },
        };

        breadcrumbData = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
                { '@type': 'ListItem', position: 2, name: 'Prompts', item: `${BASE_URL}/prompts` },
                { '@type': 'ListItem', position: 3, name: prompt.name, item: canonicalUrl },
            ],
        };
    }

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{pageTitle}</title>
            <meta name="title" content={pageTitle} />
            <meta name="description" content={pageDescription} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={article ? 'article' : (tool ? 'product' : type)} />
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

            {/* Keywords */}
            {(tool?.categories || article?.categoryLabel || prompt?.category) && (
                <meta
                    name="keywords"
                    content={[
                        tool?.categories?.join(', '),
                        tool?.tags,
                        article?.categoryLabel,
                        article?.tools?.join(', '),
                        prompt?.category?.join(', '),
                        'AI, Artificial Intelligence'
                    ].filter(Boolean).join(', ')}
                />
            )}

            {/* JSON-LD Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
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
