import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DocArticle, iconMap } from '@/data/docsData';
import { Clock, X, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface DocDetailModalProps {
    article: DocArticle | null;
    isOpen: boolean;
    onClose: () => void;
}

export function DocDetailModal({ article, isOpen, onClose }: DocDetailModalProps) {
    if (!article) return null;

    const IconComponent = iconMap[article.icon];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl h-[90vh] p-0 bg-background border-border overflow-hidden">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-card border-b border-border p-6">
                    <div className="flex items-start gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="shrink-0 -ml-2"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back
                        </Button>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <IconComponent className="w-5 h-5" />
                                </div>
                                <DialogTitle className="font-display text-xl font-bold">
                                    {article.title}
                                </DialogTitle>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="outline">
                                    {article.categoryLabel}
                                </Badge>
                                <Badge variant="outline">
                                    {article.difficulty}
                                </Badge>
                                <span className="flex items-center text-sm text-muted-foreground">
                                    <Clock className="w-3.5 h-3.5 mr-1" />
                                    {article.readTime} read
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Tools */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                        {article.tools.map((tool) => (
                            <span
                                key={tool}
                                className="px-2.5 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <ScrollArea className="flex-1 h-full">
                    <article className="p-6 prose prose-invert prose-sm max-w-none
            prose-headings:font-display prose-headings:font-semibold
            prose-h1:text-2xl prose-h1:mb-4 prose-h1:mt-0
            prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-foreground
            prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-foreground
            prose-h4:text-base prose-h4:mt-4 prose-h4:mb-2 prose-h4:text-foreground
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-semibold
            prose-code:text-primary prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-secondary prose-pre:border prose-pre:border-border prose-pre:rounded-xl
            prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
            prose-table:w-full prose-th:bg-secondary prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2 prose-td:border-border prose-tr:border-border
            prose-ul:text-muted-foreground prose-ol:text-muted-foreground
            prose-li:marker:text-primary
          ">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {article.content}
                        </ReactMarkdown>
                    </article>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
