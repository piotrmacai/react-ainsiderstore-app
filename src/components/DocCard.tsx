import { Badge } from '@/components/ui/badge';
import { DocArticle, iconMap } from '@/data/docsData';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DocCardProps {
    article: DocArticle;
    onClick?: () => void;
}

export function DocCard({ article, onClick }: DocCardProps) {

    const IconComponent = iconMap[article.icon as keyof typeof iconMap] || iconMap.FileText;

    return (
        <Link
            to={`/docs/${article.id}`}
            onClick={onClick}
            className="group block w-full text-left bg-card rounded-xl border border-border p-6 card-hover transition-all duration-300 hover:border-primary/30"
        >
            {/* Header with Icon */}
            <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                    </h3>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline">
                            {article.categoryLabel}
                        </Badge>
                        <Badge variant="outline">
                            {article.difficulty}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {article.description}
            </p>

            {/* Tools */}
            <div className="flex flex-wrap gap-1.5 mb-4">
                {article.tools.slice(0, 4).map((tool) => (
                    <span
                        key={tool}
                        className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground"
                    >
                        {tool}
                    </span>
                ))}
                {article.tools.length > 4 && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-secondary text-muted-foreground">
                        +{article.tools.length - 4}
                    </span>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5 mr-1" />
                <span>{article.readTime} read</span>
            </div>
        </Link>
    );
}

