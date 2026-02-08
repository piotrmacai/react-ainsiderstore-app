import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { docsData, DocArticle, iconMap } from '@/data/docsData';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { ArrowLeft, Clock, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

export default function DocDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const [article, setArticle] = useState<DocArticle | null>(null);

    useEffect(() => {
        if (slug) {
            const foundArticle = docsData.find(doc => doc.id === slug);
            setArticle(foundArticle || null);
        }
    }, [slug]);

    if (!article && slug) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="pt-24 pb-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto text-center py-16">
                            <h1 className="font-display text-3xl font-bold mb-4">Article Not Found</h1>
                            <p className="text-muted-foreground mb-8">
                                The requested documentation could not be found.
                            </p>
                            <Button asChild>
                                <Link to="/docs">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Docs
                                </Link>
                            </Button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!article) return null;

    const Icon = article.icon && iconMap[article.icon] ? iconMap[article.icon] : null;

    return (
        <div className="min-h-screen bg-background">
            <SEOHead article={article} url={`/docs/${slug}`} />
            <Header />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Button variant="ghost" asChild className="gap-2 pl-0 hover:pl-2 transition-all">
                            <Link to="/docs">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Docs
                            </Link>
                        </Button>
                    </div>

                    {/* Main Content */}
                    <article className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="mb-10 text-center">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                {Icon && <Icon className="w-8 h-8 text-primary" />}
                            </div>

                            <h1 className="font-display text-3xl md:text-5xl font-bold mb-6">
                                {article.title}
                            </h1>

                            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                                <Badge variant="secondary" className="px-3 py-1">
                                    {article.categoryLabel}
                                </Badge>

                                <div className="flex items-center gap-1">
                                    <BarChart className="w-4 h-4" />
                                    <span className="capitalize">{article.difficulty}</span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{article.readTime}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content Card */}
                        <div className="bg-card rounded-xl border border-border p-6 md:p-10">
                            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-a:text-primary prose-img:rounded-xl">
                                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                                    {article.content}
                                </ReactMarkdown>
                            </div>

                            {/* Tags/Tools */}
                            {article.tools && article.tools.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-border">
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                                        Related Tools
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {article.tools.map((tool) => (
                                            <Badge key={tool} variant="outline">
                                                {tool}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </article>
                </div>
            </main>

            <Footer />
        </div>
    );
}
