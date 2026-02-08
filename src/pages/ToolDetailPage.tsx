import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Tool } from '@/lib/supabase';
import { useTools } from '@/hooks/useTools';
import { findToolBySlug } from '@/lib/slugify';
import { Copy, Check, ExternalLink, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

export default function ToolDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { tools, loading } = useTools();
    const [tool, setTool] = useState<Tool | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (slug && tools.length > 0) {
            const foundTool = findToolBySlug(slug, tools);
            setTool(foundTool);
        }
    }, [slug, tools]);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            toast.success('Link copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Failed to copy link');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="pt-24 pb-20">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-center py-16">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!tool) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="pt-24 pb-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto text-center py-16">
                            <h1 className="font-display text-3xl font-bold mb-4">Tool Not Found</h1>
                            <p className="text-muted-foreground mb-8">
                                The requested tool could not be found.
                            </p>
                            <Button asChild>
                                <Link to="/tools">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Tools
                                </Link>
                            </Button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <SEOHead tool={tool} url={`/tools/${slug}`} />
            <Header />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Button variant="ghost" asChild className="gap-2 pl-0 hover:pl-2 transition-all">
                            <Link to="/tools">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Tools
                            </Link>
                        </Button>
                    </div>

                    {/* Main Content */}
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                                <h1 className="font-display text-3xl md:text-4xl font-bold">
                                    {tool.name}
                                </h1>
                                {tool.link && (
                                    <Button asChild size="lg">
                                        <a href={tool.link} target="_blank" rel="noopener noreferrer">
                                            Visit Tool
                                            <ExternalLink className="w-4 h-4 ml-2" />
                                        </a>
                                    </Button>
                                )}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {tool.categories && tool.categories.map((category, index) => (
                                    <Badge key={index} variant="secondary" className="text-sm">
                                        {category}
                                    </Badge>
                                ))}
                                {tool.tags && (
                                    <Badge variant="outline" className="text-sm">
                                        {tool.tags}
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* Content Card */}
                        <div className="bg-card rounded-xl border border-border p-6 md:p-8 space-y-8">
                            {/* Description */}
                            <section>
                                <h2 className="text-lg font-semibold mb-3 text-foreground">Description</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {tool.description || 'No description available'}
                                </p>
                            </section>

                            {/* Website Link */}
                            {tool.link && (
                                <section>
                                    <h2 className="text-lg font-semibold mb-3 text-foreground">Website</h2>
                                    <a
                                        href={tool.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-primary hover:underline break-all"
                                    >
                                        {tool.link}
                                        <ExternalLink className="w-4 h-4 shrink-0" />
                                    </a>
                                </section>
                            )}

                            {/* Article/About */}
                            {tool.article && (
                                <section>
                                    <h2 className="text-lg font-semibold mb-3 text-foreground">About This Tool</h2>
                                    <div className="bg-secondary/30 rounded-lg p-4 md:p-6 prose prose-sm dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground">
                                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{tool.article}</ReactMarkdown>
                                    </div>
                                </section>
                            )}

                            {/* Share Section */}
                            <section className="pt-6 border-t border-border">
                                <div className="flex justify-between items-center flex-wrap gap-4">
                                    <p className="text-sm text-muted-foreground">
                                        Share this tool with others
                                    </p>
                                    <Button variant="outline" onClick={handleCopyLink}>
                                        {copied ? (
                                            <>
                                                <Check className="w-4 h-4 mr-2" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4 mr-2" />
                                                Copy Link
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
