import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BlogCardSkeleton } from '@/components/LoadingSkeletons';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Placeholder blog data - you'll need to create a blog table in Supabase
const placeholderPosts = [
  {
    id: '1',
    title: 'The Rise of AI Agents: What You Need to Know in 2024',
    excerpt: 'AI agents are revolutionizing how we work and interact with technology. Explore the latest developments and what they mean for the future.',
    category: 'AI Trends',
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    published_at: '2024-01-15',
  },
  {
    id: '2',
    title: 'Top 10 AI Tools for Productivity in 2024',
    excerpt: 'Discover the most powerful AI tools that can transform your workflow and boost your productivity to new heights.',
    category: 'Tools',
    image_url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    published_at: '2024-01-12',
  },
  {
    id: '3',
    title: 'Understanding Large Language Models: A Beginner\'s Guide',
    excerpt: 'Learn the fundamentals of LLMs, how they work, and why they\'re changing the landscape of artificial intelligence.',
    category: 'Education',
    image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
    published_at: '2024-01-10',
  },
  {
    id: '4',
    title: 'The Future of Prompt Engineering',
    excerpt: 'As AI becomes more sophisticated, the art of crafting effective prompts becomes increasingly valuable. Here\'s what experts predict.',
    category: 'Prompts',
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    published_at: '2024-01-08',
  },
];

const BlogPage = () => {
  const loading = false;
  const posts = placeholderPosts;

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
          </div>

          {/* Blog Posts */}
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="space-y-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <article
                    key={post.id}
                    className="group bg-card rounded-2xl border border-border overflow-hidden card-hover animate-fade-in flex flex-col md:flex-row"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    {/* Image */}
                    <div className="relative w-full md:w-72 h-48 md:h-auto shrink-0 overflow-hidden">
                      {post.image_url ? (
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary flex items-center justify-center">
                          <Newspaper className="w-12 h-12 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        {post.category && (
                          <Badge variant="secondary">{post.category}</Badge>
                        )}
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.published_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <h2 className="font-display text-xl md:text-2xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <button className="inline-flex items-center text-primary font-medium self-start group/btn">
                        Read More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Newspaper className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">
                  No blog posts available yet
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
