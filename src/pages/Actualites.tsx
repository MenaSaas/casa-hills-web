
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, Trophy, BookOpen, Camera, ArrowRight, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Link } from 'react-router-dom';

type BlogPost = Tables<'blog_posts'>;
type Event = Tables<'events'>;

const Actualites = () => {
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['recent-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      return data;
    },
  });

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['upcoming-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published')
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true })
        .limit(4);

      if (error) throw error;
      return data;
    },
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return format(date, 'd MMMM yyyy', { locale: fr });
  };

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'd MMM', { locale: fr });
  };

  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'HH:mm', { locale: fr });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Événement': return <Calendar className="h-5 w-5" />;
      case 'Réussite': return <Trophy className="h-5 w-5" />;
      case 'Culture': return <Camera className="h-5 w-5" />;
      case 'Sport': return <Users className="h-5 w-5" />;
      case 'Pédagogie': return <BookOpen className="h-5 w-5" />;
      case 'International': return <Users className="h-5 w-5" />;
      default: return <Calendar className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Événement': return 'bg-casa-blue text-white';
      case 'Réussite': return 'bg-yellow-500 text-white';
      case 'Culture': return 'bg-purple-500 text-white';
      case 'Sport': return 'bg-green-500 text-white';
      case 'Pédagogie': return 'bg-casa-red text-white';
      case 'International': return 'bg-indigo-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-casa-blue to-casa-red text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-display font-bold mb-6">
              Actualités & Événements
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Découvrez la vie dynamique de Casa Hills à travers nos actualités, 
              événements et réussites de nos élèves.
            </p>
          </div>
        </div>
      </section>

      {/* Actualités principales */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Dernières Actualités
            </h2>
            <p className="text-xl text-gray-600">
              Restez informés de toute l'actualité de notre école.
            </p>
          </div>

          {postsLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <>
              {/* Articles à la une */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {posts.slice(0, 2).map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                    {post.image_url && (
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-gray-500 text-sm">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatDate(post.published_at)}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                      <p className="text-gray-600 mb-4">
                        {post.excerpt || post.content.substring(0, 150) + '...'}
                      </p>
                      <Link to={`/blog/${post.slug}`}>
                        <Button variant="outline" size="sm">
                          Lire la suite
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Autres articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(2).map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {post.image_url && (
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-gray-500 text-xs">
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                        </div>
                        <span className="text-gray-500 text-xs">{formatDate(post.published_at)}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {post.excerpt || post.content.substring(0, 100) + '...'}
                      </p>
                      <Link to={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="text-casa-blue hover:text-casa-blue group">
                          Lire plus
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Link to full blog */}
              <div className="text-center mt-12">
                <Link to="/blog">
                  <Button className="bg-casa-blue hover:bg-blue-700">
                    Voir tous les articles
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun article disponible</h3>
              <p className="text-gray-500">
                Revenez bientôt pour découvrir nos derniers articles.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Événements à venir */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Événements à Venir
            </h2>
            <p className="text-xl text-gray-600">
              Ne manquez aucun événement important de Casa Hills.
            </p>
          </div>

          {eventsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse text-center p-6">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : events && events.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {events.map((event) => (
                  <Card key={event.id} className="text-center p-6 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="w-16 h-16 bg-casa-blue rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-sm">{formatEventDate(event.event_date)}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                      <div className="flex items-center justify-center text-gray-500 text-sm mb-2">
                        <Clock className="h-4 w-4 mr-1" />
                        {formatEventTime(event.event_date)}
                      </div>
                      <div className="flex items-center justify-center text-gray-500 text-sm mb-3">
                        <Users className="h-4 w-4 mr-1" />
                        {event.location}
                      </div>
                      <span className="inline-block bg-casa-red text-white px-3 py-1 rounded-full text-xs">
                        Événement
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Link to all events */}
              <div className="text-center mt-12">
                <Link to="/evenements">
                  <Button variant="outline" className="border-casa-blue text-casa-blue hover:bg-casa-blue hover:text-white">
                    Voir tous les événements
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun événement à venir</h3>
              <p className="text-gray-500">
                Revenez bientôt pour découvrir nos prochains événements.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-casa-blue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold mb-6">
            Restez Informés
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Inscrivez-vous à notre newsletter pour recevoir toutes les actualités 
            de Casa Hills directement dans votre boîte mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button className="bg-casa-red hover:bg-red-700 px-6">
              S'abonner
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Actualites;
