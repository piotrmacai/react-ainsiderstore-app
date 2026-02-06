import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DocCard } from '@/components/DocCard';
import { DocsSidebar } from '@/components/DocsSidebar';
import { DocDetailModal } from '@/components/DocDetailModal';
import { docsData, DocArticle, CATEGORIES } from '@/data/docsData';
import { Search, BookOpen, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';

const DocsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<DocArticle | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory((prev) => (prev === category ? null : category));
    };

    const handleToolChange = (tool: string) => {
        setSelectedTools((prev) =>
            prev.includes(tool)
                ? prev.filter((t) => t !== tool)
                : [...prev, tool]
        );
    };

    const handleClearFilters = () => {
        setSelectedCategory(null);
        setSelectedTools([]);
        setSearchQuery('');
    };

    const handleArticleClick = (article: DocArticle) => {
        setSelectedArticle(article);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedArticle(null), 200);
    };

    const filteredArticles = useMemo(() => {
        return docsData.filter((article) => {
            const matchesSearch =
                !searchQuery ||
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.description.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory =
                !selectedCategory || article.category === selectedCategory;

            const matchesTools =
                selectedTools.length === 0 ||
                selectedTools.some((tool) => article.tools.includes(tool));

            return matchesSearch && matchesCategory && matchesTools;
        });
    }, [searchQuery, selectedCategory, selectedTools]);

    // Group articles by category for display
    const groupedArticles = useMemo(() => {
        if (selectedCategory) {
            return [{ category: selectedCategory, articles: filteredArticles }];
        }

        return CATEGORIES.map(({ id, label }) => ({
            category: id,
            label,
            articles: filteredArticles.filter((a) => a.category === id),
        })).filter((group) => group.articles.length > 0);
    }, [filteredArticles, selectedCategory]);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            Learn AI Fundamentals
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                            AI <span className="gradient-text">Documentation</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Master AI agents, automation, and creative AI with comprehensive guides and tutorials
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto mb-12">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search documentation..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-12 bg-card border-border text-base"
                            />
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="flex flex-wrap justify-center gap-8 mb-12 py-6 px-8 rounded-xl bg-card border border-border">
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-primary" />
                            <span className="text-muted-foreground">
                                <span className="text-foreground font-semibold">{docsData.length}</span> Articles
                            </span>
                        </div>
                        {CATEGORIES.map(({ id, label, icon: Icon }) => (
                            <div key={id} className="flex items-center gap-2">
                                <Icon className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">
                                    <span className="text-foreground font-semibold">
                                        {docsData.filter((a) => a.category === id).length}
                                    </span>{' '}
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar */}
                        <DocsSidebar
                            selectedCategory={selectedCategory}
                            selectedTools={selectedTools}
                            onCategoryChange={handleCategoryChange}
                            onToolChange={handleToolChange}
                            onClearFilters={handleClearFilters}
                        />

                        {/* Articles Grid */}
                        <div className="flex-1">
                            {filteredArticles.length > 0 ? (
                                <div className="space-y-10">
                                    {groupedArticles.map(({ category, label, articles }) => (
                                        <section key={category}>
                                            {!selectedCategory && (
                                                <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                                                    {label || CATEGORIES.find((c) => c.id === category)?.label}
                                                    <span className="text-sm font-normal text-muted-foreground">
                                                        ({articles.length} articles)
                                                    </span>
                                                </h2>
                                            )}
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {articles.map((article) => (
                                                    <DocCard
                                                        key={article.id}
                                                        article={article}
                                                        onClick={() => handleArticleClick(article)}
                                                    />
                                                ))}
                                            </div>
                                        </section>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-card rounded-xl border border-border">
                                    <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                                    <p className="text-muted-foreground text-lg mb-2">
                                        No articles found
                                    </p>
                                    <p className="text-muted-foreground text-sm">
                                        Try adjusting your search or filters
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            {/* Article Detail Modal */}
            <DocDetailModal
                article={selectedArticle}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default DocsPage;
