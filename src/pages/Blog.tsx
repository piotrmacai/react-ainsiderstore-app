import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Calendar, Newspaper, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useSubstackFeed } from '@/hooks/useSubstackFeed';

const Blog = () => {
  const { articles: substackArticles, loading: substackLoading } = useSubstackFeed();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              AI News & <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest trends, news, and insights in artificial intelligence
            </p>
            <a
              href="https://ainsiderai.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
            >
              Subscribe to Newsletter
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Substack Articles */}
          <div className="max-w-7xl mx-auto">
            {substackLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="bg-card rounded-xl border border-border p-5 animate-pulse">
                    <div className="h-4 bg-secondary rounded w-24 mb-3" />
                    <div className="h-6 bg-secondary rounded w-full mb-2" />
                    <div className="h-4 bg-secondary rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : substackArticles.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {substackArticles.map((article, index) => (
                  <a
                    key={article.link}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-card rounded-xl border border-border p-5 card-hover animate-fade-in block"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                        Substack
                      </Badge>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(article.pubDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {article.description}
                    </p>

                    <span className="inline-flex items-center text-primary text-sm font-medium group/link">
                      Read on Substack
                      <ExternalLink className="ml-1.5 w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-xl border border-border">
                <Newspaper className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg mb-4">
                  Unable to load articles
                </p>
                <a
                  href="https://ainsiderai.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-medium"
                >
                  Visit Substack directly
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
