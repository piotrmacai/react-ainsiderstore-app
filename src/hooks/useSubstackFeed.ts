import { useState, useEffect } from 'react';

export interface SubstackArticle {
    title: string;
    link: string;
    pubDate: string;
    description: string;
    creator: string;
}

export const useSubstackFeed = () => {
    const [articles, setArticles] = useState<SubstackArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                setLoading(true);
                // Using a CORS proxy to fetch the RSS feed
                // You can also use rss2json API which is free for small usage
                const response = await fetch(
                    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://ainsiderai.substack.com/feed')}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch Substack feed');
                }

                const data = await response.json();

                if (data.status === 'ok' && data.items) {
                    const formattedArticles: SubstackArticle[] = data.items.map((item: any) => ({
                        title: item.title,
                        link: item.link,
                        pubDate: item.pubDate,
                        description: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...' || '',
                        creator: item.author || 'Ainsider AI',
                    }));

                    setArticles(formattedArticles);
                } else {
                    throw new Error('Invalid feed response');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load articles');
                console.error('Error fetching Substack feed:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeed();
    }, []);

    return { articles, loading, error };
};
