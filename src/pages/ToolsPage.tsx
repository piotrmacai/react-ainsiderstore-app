import { useState, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { useTools } from '@/hooks/useTools';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToolCard } from '@/components/ToolCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { ToolCardSkeleton } from '@/components/LoadingSkeletons';
import { Search, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Fixed pricing tags for filtering
const PRICING_TAGS = ['Free', 'Freemium', 'Premium', 'Open-source'];
const ITEMS_PER_PAGE = 50;

const ToolsPage = () => {
  const { tools, loading, error, categories } = useTools();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showTopOnly, setShowTopOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
    setVisibleCount(ITEMS_PER_PAGE); // Reset pagination on filter change
  };

  const handleTagChange = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
    setVisibleCount(ITEMS_PER_PAGE); // Reset pagination on filter change
  };

  const handleTopFilterChange = () => {
    setShowTopOnly((prev) => !prev);
    setVisibleCount(ITEMS_PER_PAGE); // Reset pagination on filter change
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
    setShowTopOnly(false);
    setSearchQuery('');
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(ITEMS_PER_PAGE); // Reset pagination on search change
  };

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        !searchQuery ||
        tool.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory || (tool.categories && tool.categories.includes(selectedCategory));

      const matchesTags =
        !selectedTag || tool.tags === selectedTag;

      const matchesTop =
        !showTopOnly || (tool.top !== null && tool.top !== undefined && tool.top !== '');

      return matchesSearch && matchesCategory && matchesTags && matchesTop;
    });
  }, [tools, searchQuery, selectedCategory, selectedTag, showTopOnly]);

  const visibleTools = useMemo(() => {
    return filteredTools.slice(0, visibleCount);
  }, [filteredTools, visibleCount]);

  const hasMore = visibleCount < filteredTools.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              AI Tools <span className="gradient-text">Directory</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the best AI tools and agents to supercharge your workflow
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-12 h-12 bg-card border-border"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <FilterSidebar
              categories={categories}
              tags={PRICING_TAGS}
              selectedCategories={selectedCategory ? [selectedCategory] : []}
              selectedTags={selectedTag ? [selectedTag] : []}
              showTopOnly={showTopOnly}
              onCategoryChange={handleCategoryChange}
              onTagChange={handleTagChange}
              onTopFilterChange={handleTopFilterChange}
              onClearFilters={handleClearFilters}
            />

            {/* Tools Grid */}
            <div className="flex-1">
              {error && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive mb-6">
                  <AlertCircle className="w-5 h-5" />
                  <p>{error}</p>
                </div>
              )}

              {loading ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ToolCardSkeleton key={i} />
                  ))}
                </div>
              ) : filteredTools.length > 0 ? (
                <>
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {visibleTools.map((tool, index) => (
                      <div
                        key={tool.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${0.05 * Math.min(index, 10)}s` }}
                      >
                        <ToolCard tool={tool} />
                      </div>
                    ))}
                  </div>

                  {/* Load More */}
                  {hasMore && (
                    <div className="flex flex-col items-center mt-10 gap-2">
                      <p className="text-sm text-muted-foreground">
                        Showing {visibleTools.length} of {filteredTools.length} tools
                      </p>
                      <Button
                        onClick={handleLoadMore}
                        variant="outline"
                        size="lg"
                        className="min-w-[200px]"
                      >
                        Load More
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    No tools found matching your criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <Outlet />
    </div>
  );
};

export default ToolsPage;
