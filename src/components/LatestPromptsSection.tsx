import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PromptCard } from '@/components/PromptCard';
import { usePromptsDirectory } from '@/hooks/usePromptsDirectory';
import { createPromptSlug } from '@/lib/slugify';

export function LatestPromptsSection() {
  const { prompts, loading, error } = usePromptsDirectory();
  const navigate = useNavigate();
  
  // Get latest 9 prompts
  const latestPrompts = prompts.slice(0, 9);

  if (error) {
    return null;
  }

  return (
    <section className="py-20 relative border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Latest Prompts
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Explore the newest prompts from our curated library
            </p>
          </div>
          <Button asChild variant="outline" className="group w-fit">
            <Link to="/prompts">
              View All Prompts
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
            {latestPrompts.map((prompt) => (
              <PromptCard 
                key={prompt.id} 
                prompt={prompt} 
                onClick={() => navigate(`/prompts/${createPromptSlug(prompt.id, prompt.name)}`)}
              />
            ))}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <Button asChild size="lg" className="glow-effect group">
            <Link to="/tools">
              Explore AI Tools
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="group">
            <Link to="/prompts">
              Browse Prompts Library
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
