import { X } from 'lucide-react';
import { CATEGORIES, TOOLS } from '@/data/docsData';

interface DocsSidebarProps {
    selectedCategory: string | null;
    selectedTools: string[];
    onCategoryChange: (category: string) => void;
    onToolChange: (tool: string) => void;
    onClearFilters: () => void;
}

export function DocsSidebar({
    selectedCategory,
    selectedTools,
    onCategoryChange,
    onToolChange,
    onClearFilters,
}: DocsSidebarProps) {
    const hasActiveFilters = selectedCategory !== null || selectedTools.length > 0;

    return (
        <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-card rounded-xl border border-border p-5 sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-semibold text-lg">Filters</h3>
                    {hasActiveFilters && (
                        <button
                            onClick={onClearFilters}
                            className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                        >
                            <X className="w-3 h-3" />
                            Clear all
                        </button>
                    )}
                </div>

                <div className="space-y-6">
                    {/* Categories */}
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">
                            Categories
                        </h4>
                        <div className="space-y-2">
                            {CATEGORIES.map(({ id, label, icon: Icon }) => {

                                return (
                                    <button
                                        key={id}
                                        onClick={() => onCategoryChange(id)}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                                    >
                                        <Icon className="w-4 h-4" />
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tools */}
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">
                            Filter by Tools
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {TOOLS.map((tool) => {
                                const isSelected = selectedTools.includes(tool);

                                return (
                                    <button
                                        key={tool}
                                        onClick={() => onToolChange(tool)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${isSelected
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary'
                                            }`}
                                    >
                                        {tool}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="pt-4 border-t border-border">
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="p-2 rounded-lg bg-cyan-500/10">
                                <div className="text-lg font-bold text-cyan-500">5</div>
                                <div className="text-xs text-muted-foreground">Agents</div>
                            </div>
                            <div className="p-2 rounded-lg bg-violet-500/10">
                                <div className="text-lg font-bold text-violet-500">5</div>
                                <div className="text-xs text-muted-foreground">Automation</div>
                            </div>
                            <div className="p-2 rounded-lg bg-pink-500/10">
                                <div className="text-lg font-bold text-pink-500">5</div>
                                <div className="text-xs text-muted-foreground">Creative</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
