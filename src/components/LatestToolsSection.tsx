import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToolCard } from '@/components/ToolCard';
import { useTools } from '@/hooks/useTools';

export function LatestToolsSection() {
  const { tools, loading, error } = useTools();

  // Get latest 30 tools that are marked as Top Tool
  const latestTools = tools
    .filter(tool => tool.top)
    .sort((a, b) => new Date(b.created || 0).getTime() - new Date(a.created || 0).getTime())
    .slice(0, 30);

  if (error) {
    return null;
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Latest AI Tools
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Discover the newest additions to our curated AI tools directory
            </p>
          </div>
          <Button asChild variant="outline" className="group w-fit">
            <Link to="/tools">
              View All Tools
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
