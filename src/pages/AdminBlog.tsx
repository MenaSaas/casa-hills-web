import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useContentManager, BlogPost } from '@/hooks/useContentManager';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Clock,
  User
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const AdminBlog = () => {
  const { adminSession, isLoading } = useAdminAuth();
  const { blogPosts, loading, fetchBlogPosts, deleteBlogPost } = useContentManager();
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    if (adminSession) {
      fetchBlogPosts();
    }
  }, [adminSession]);

  const filteredPosts = blogPosts.filter(post => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await deleteBlogPost(id);
      } catch (error) {
        console.error('Error deleting blog post:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-casa-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-casa-blue">
                Gestion du blog
              </h1>
              <p className="text-gray-600">
                Créer et gérer les articles du blog
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="outline">
                  Retour au dashboard
                </Button>
              </Link>
              <Link to="/admin/blog/new">
                <Button className="bg-casa-blue hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvel article
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            Tous ({blogPosts.length})
          </Button>
          <Button
            variant={filter === 'published' ? 'default' : 'outline'}
            onClick={() => setFilter('published')}
          >
            Publiés ({blogPosts.filter(p => p.status === 'published').length})
          </Button>
          <Button
            variant={filter === 'draft' ? 'default' : 'outline'}
            onClick={() => setFilter('draft')}
          >
            Brouillons ({blogPosts.filter(p => p.status === 'draft').length})
          </Button>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-casa-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des articles...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucun article
              </h3>
              <p className="text-gray-600 mb-4">
                Commencez par créer votre premier article de blog.
              </p>
              <Link to="/admin/blog/new">
                <Button className="bg-casa-blue hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer un article
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status === 'published' ? 'Publié' : 'Brouillon'}
                    </Badge>
                    <div className="flex gap-2">
                      <Link to={`/admin/blog/edit/${post.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-32 object-cover rounded-md mb-4"
                    />
                  )}
                  
                  {post.excerpt && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    {post.published_at && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        Publié le {format(new Date(post.published_at), 'dd MMMM yyyy', { locale: fr })}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      Créé le {format(new Date(post.created_at), 'dd/MM/yyyy', { locale: fr })}
                    </div>
                  </div>

                  {post.status === 'published' && (
                    <div className="mt-4 pt-4 border-t">
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-casa-blue hover:underline"
                      >
                        <Eye className="h-4 w-4" />
                        Voir sur le site
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminBlog;