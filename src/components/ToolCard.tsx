import { Tool } from '@/lib/supabase';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { createToolSlug } from '@/lib/slugify';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/tools/${createToolSlug(tool.id, tool.name)}`);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-card rounded-xl border border-border overflow-hidden card-hover p-5 cursor-pointer"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {tool.name}
          </h3>
          {tool.link && (
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="shrink-0 p-1.5 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {tool.description || 'No description available'}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tool.categories && tool.categories.map((category, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
          {tool.tags && (
            <Badge variant="outline" className="text-xs">
              {tool.tags}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
