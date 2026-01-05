import { X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FilterSidebarProps {
  categories: string[];
  tags: string[];
  selectedCategories: string[];
  selectedTags: string[];
  showTopOnly?: boolean;
  onCategoryChange: (category: string) => void;
  onTagChange: (tag: string) => void;
  onTopFilterChange?: () => void;
  onClearFilters: () => void;
}

export function FilterSidebar({
  categories,
  tags,
  selectedCategories,
  selectedTags,
  showTopOnly,
  onCategoryChange,
  onTagChange,
  onTopFilterChange,
  onClearFilters,
}: FilterSidebarProps) {
  const hasActiveFilters = selectedCategories.length > 0 || selectedTags.length > 0 || showTopOnly;

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>

        <div>
          <div className="space-y-6">
            {/* Top Picks Filter */}
            {onTopFilterChange && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Featured</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={onTopFilterChange}
                    className={`filter-chip ${showTopOnly ? 'active' : ''}`}
                  >
                    ⭐ Top Picks
                  </button>
                </div>
              </div>
            )}

            {/* Tags (Pricing) - Now above Categories */}
            {tags.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Pricing</h4>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => onTagChange(tag)}
                      className={`filter-chip ${
                        selectedTags.includes(tag) ? 'active' : ''
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            {categories.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => onCategoryChange(category)}
                      className={`filter-chip ${
                        selectedCategories.includes(category) ? 'active' : ''
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {categories.length === 0 && tags.length === 0 && (
              <p className="text-sm text-muted-foreground">No filters available</p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
