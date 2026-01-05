import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Prompt } from '@/lib/supabase';
import { usePromptsDirectory } from '@/hooks/usePromptsDirectory';
import { extractIdFromSlug } from '@/lib/slugify';
import { Copy, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function PromptDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { prompts, loading } = usePromptsDirectory();
  
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPrompt, setEditedPrompt] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (slug && prompts.length > 0) {
      const id = extractIdFromSlug(slug);
      if (id !== null) {
        const foundPrompt = prompts.find((p) => p.id === id);
        setPrompt(foundPrompt || null);
        if (foundPrompt) {
          setEditedName(foundPrompt.name || '');
          setEditedDescription(foundPrompt.description || '');
          setEditedPrompt(foundPrompt.prompt || '');
        }
      }
    }
  }, [slug, prompts]);

  const handleClose = () => {
    navigate(-1);
  };

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success(`${field} copied to clipboard!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleCopyAll = async () => {
    const fullContent = `Name: ${editedName}\n\nDescription: ${editedDescription}\n\nPrompt:\n${editedPrompt}`;
    await handleCopy(fullContent, 'all');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedField('link');
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopiedField(null), 2000);
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

  if (!prompt) {
    return (
      <Dialog open onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Prompt Not Found</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">The requested prompt could not be found.</p>
          <Button onClick={handleClose}>Go Back</Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="font-display">Edit Prompt</span>
            {prompt.category && (
              <Badge variant="secondary" className="text-xs">
                {prompt.category}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* Name Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="name" className="text-sm font-medium">Name</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(editedName, 'Name')}
                className="h-7 px-2"
              >
                {copiedField === 'Name' ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </Button>
            </div>
            <Input
              id="name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="bg-secondary/50"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(editedDescription, 'Description')}
                className="h-7 px-2"
              >
                {copiedField === 'Description' ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </Button>
            </div>
            <Textarea
              id="description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="bg-secondary/50 min-h-[80px] resize-y"
            />
          </div>

          {/* Prompt Content Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="prompt" className="text-sm font-medium">Prompt Content</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(editedPrompt, 'Prompt')}
                className="h-7 px-2"
              >
                {copiedField === 'Prompt' ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </Button>
            </div>
            <Textarea
              id="prompt"
              value={editedPrompt}
              onChange={(e) => setEditedPrompt(e.target.value)}
              className="bg-secondary/50 min-h-[200px] font-mono text-sm resize-y"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Edits are temporary and won't be saved
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
              >
                {copiedField === 'link' ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Link Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Share Link
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditedName(prompt.name || '');
                  setEditedDescription(prompt.description || '');
                  setEditedPrompt(prompt.prompt || '');
                  toast.info('Reset to original');
                }}
              >
                Reset
              </Button>
              <Button size="sm" onClick={handleCopyAll}>
                {copiedField === 'all' ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
