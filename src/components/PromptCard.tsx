import { Prompt } from '@/lib/supabase';
import { Copy, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { toast } from 'sonner';

interface PromptCardProps {
  prompt: Prompt;
  onClick?: () => void;
}

export function PromptCard({ prompt, onClick }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening modal when copying
    try {
      await navigator.clipboard.writeText(prompt.prompt || '');
      setCopied(true);
      toast.success('Prompt copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy prompt');
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-card rounded-xl border border-border overflow-hidden card-hover cursor-pointer"
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-display font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {prompt.name}
          </h3>
          <button
            onClick={handleCopy}
            className="shrink-0 p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Description */}
        {prompt.description && (
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {prompt.description}
          </p>
        )}

        {/* Prompt Preview */}
        <div className="bg-secondary/50 rounded-lg p-3 mb-4">
          <p className="text-muted-foreground text-sm font-mono line-clamp-4">
            {prompt.prompt || 'No prompt content'}
          </p>
        </div>

        {/* Category */}
        <div className="flex flex-wrap gap-2">
          {prompt.category && (
            <Badge variant="secondary" className="text-xs">
              {prompt.category}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
