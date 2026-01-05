import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePromptsDirectory } from '@/hooks/usePromptsDirectory';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PromptCard } from '@/components/PromptCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { PromptCardSkeleton } from '@/components/LoadingSkeletons';
import { Search, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { createPromptSlug } from '@/lib/slugify';

const PromptsPage = () => {
  const { prompts, loading, error, categories } = usePromptsDirectory();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCategoryChange = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      // Search filter
      const matchesSearch =
        !searchQuery ||
        prompt.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.prompt?.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = !selectedCategory || prompt.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [prompts, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Prompt <span className="gradient-text">Library</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Curated prompts to unlock the full potential of AI models
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card border-border"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <FilterSidebar
              categories={categories}
              tags={[]}
              selectedCategories={selectedCategory ? [selectedCategory] : []}
              selectedTags={[]}
              onCategoryChange={handleCategoryChange}
              onTagChange={() => {}}
              onClearFilters={handleClearFilters}
            />

            {/* Prompts Grid */}
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
                    <PromptCardSkeleton key={i} />
                  ))}
                </div>
              ) : filteredPrompts.length > 0 ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPrompts.map((prompt, index) => (
                    <div
                      key={prompt.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${0.05 * index}s` }}
                    >
                      <PromptCard
                        prompt={prompt}
                        onClick={() => navigate(`/prompts/${createPromptSlug(prompt.id, prompt.name)}`)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">
                    No prompts found matching your criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PromptsPage;
