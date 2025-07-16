import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type BlogPost = Tables<'blog_posts'>;

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const { data: relatedPosts } = useQuery({
    queryKey: ['related-posts', post?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .neq('id', post!.id)
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
    enabled: !!post?.id,
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'd MMMM yyyy', { locale: fr });
  };

  const shareUrl = `${window.location.origin}/blog/${slug}`;
  const shareText = post ? `${post.title} - Casa Hills` : '';

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
          <p className="text-gray-600 mb-8">
            L'article que vous recherchez n'existe pas ou n'est plus disponible.
          </p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link to="/blog" className="inline-flex items-center text-casa-blue hover:text-casa-red mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au blog
          </Link>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 text-gray-500 text-sm">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(post.published_at)}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 text-sm">Partager:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-casa-blue"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-casa-blue"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>

        {post.image_url && (
          <div className="mb-8">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="text-gray-800 leading-relaxed"
          />
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-8 text-center">
              Articles Similaires
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {relatedPost.image_url && (
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={relatedPost.image_url}
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(relatedPost.published_at)}
                    </div>
                    <h3 className="text-lg font-bold mb-3">{relatedPost.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {relatedPost.excerpt || relatedPost.content.substring(0, 100) + '...'}
                    </p>
                    <Link to={`/blog/${relatedPost.slug}`}>
                      <Button variant="outline" size="sm">
                        Lire l'article
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost;