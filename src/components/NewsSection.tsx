
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Users, BookOpen, Trophy } from 'lucide-react';

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: "Journée Portes Ouvertes 2024",
      excerpt: "Découvrez nos installations et rencontrez notre équipe pédagogique le samedi 16 mars 2024.",
      date: "2024-03-16",
      category: "Événement",
      image: "photo-1523050854058-8df90110c9f1",
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 2,
      title: "Nouveau Laboratoire de Sciences",
      excerpt: "Inauguration de notre laboratoire de physique-chimie équipé des dernières technologies.",
      date: "2024-03-10",
      category: "Infrastructure",
      image: "photo-1532094349884-543bc11b234d",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      id: 3,
      title: "Succès aux Olympiades de Mathématiques",
      excerpt: "Nos élèves remportent le 1er prix aux Olympiades Régionales de Mathématiques 2024.",
      date: "2024-03-05",
      category: "Réussites",
      image: "photo-1596495577886-d920f1fb7238",
      icon: <Trophy className="h-5 w-5" />
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Actualités & Vie Scolaire
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Suivez la vie active de notre école et les dernières nouvelles 
            de la communauté Casa Hills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {news.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="aspect-w-16 aspect-h-10 relative">
                <img
                  src={`https://images.unsplash.com/${article.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 bg-casa-blue text-white text-xs font-medium rounded-full">
                    {article.icon}
                    <span className="ml-1">{article.category}</span>
                  </span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(article.date)}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-casa-blue transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <button className="inline-flex items-center text-casa-blue hover:text-blue-700 font-medium transition-colors group">
                  Lire la suite
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/actualites">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-casa-blue text-casa-blue hover:bg-casa-blue hover:text-white transition-all duration-300"
            >
              Voir toutes les actualités
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
