import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tool } from '@/lib/supabase';
import { useTools } from '@/hooks/useTools';
import { extractIdFromSlug } from '@/lib/slugify';
import { Copy, Check, ExternalLink, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function ToolDetailModal() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { tools, loading } = useTools();
  const [tool, setTool] = useState<Tool | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (slug && tools.length > 0) {
      const id = extractIdFromSlug(slug);
      if (id !== null) {
        const foundTool = tools.find((t) => t.id === id);
        setTool(foundTool || null);
      }
    }
  }, [slug, tools]);

  const handleClose = () => {
    navigate('/tools');
  };

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
      <Dialog open onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl">
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!tool) {
    return (
      <Dialog open onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tool Not Found</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">The requested tool could not be found.</p>
          <Button onClick={handleClose}>Go Back</Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 pr-8">
            <span className="font-display text-xl">{tool.name}</span>
            {tool.categories && (
              <Badge variant="secondary" className="text-xs">
                {tool.categories}
              </Badge>
            )}
            {tool.tags && (
              <Badge variant="outline" className="text-xs">
                {tool.tags}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Description */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-muted-foreground">Description</h3>
            <p className="text-foreground">
              {tool.description || 'No description available'}
            </p>
          </div>

          {/* Article/Details */}
          {tool.article && (
            <div>
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">About This Tool</h3>
              <div className="bg-secondary/30 rounded-lg p-4 prose prose-sm dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-foreground">{tool.article}</p>
              </div>
            </div>
          )}

          {/* Link */}
          {tool.link && (
            <div>
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">Website</h3>
              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                {tool.link}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Share this tool with others
            </p>
            <div className="flex gap-2">
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
              {tool.link && (
                <Button asChild>
                  <a href={tool.link} target="_blank" rel="noopener noreferrer">
                    Visit Tool
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
