
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, Trophy, BookOpen, Camera } from 'lucide-react';

const Actualites = () => {
  const news = [
    {
      date: "15 Décembre 2024",
      category: "Événement",
      title: "Journée Portes Ouvertes - Samedi 20 Janvier 2025",
      description: "Venez découvrir Casa Hills ! Visite des locaux, rencontre avec les équipes pédagogiques, démonstrations en classes. De 9h à 16h.",
      image: "photo-1581091226825-a6a2a5aee158",
      featured: true
    },
    {
      date: "10 Décembre 2024",
      category: "Réussite",
      title: "Nos élèves brillent aux Olympiades de Mathématiques",
      description: "Félicitations à nos 3 élèves finalistes aux Olympiades nationales de Mathématiques. Une performance remarquable !",
      image: "photo-1461749280684-dccba630e2f6",
      featured: true
    },
    {
      date: "5 Décembre 2024",
      category: "Culture",
      title: "Spectacle de fin d'année : 'Le Petit Prince'",
      description: "Les élèves de primaire et collège présentent leur adaptation du célèbre conte. Représentation le 18 décembre à 19h.",
      image: "photo-1519389950473-47ba0277781c",
      featured: false
    },
    {
      date: "28 Novembre 2024",
      category: "Sport",
      title: "Championnat Inter-Écoles de Basketball",
      description: "Nos équipes masculines et féminines se sont qualifiées pour les finales régionales. Match décisif le 15 décembre.",
      image: "photo-1486312338219-ce68d2c6f44d",
      featured: false
    },
    {
      date: "20 Novembre 2024",
      category: "Pédagogie",
      title: "Nouveau laboratoire de sciences inauguré",
      description: "Casa Hills inaugure son nouveau laboratoire équipé des dernières technologies pour l'enseignement des sciences.",
      image: "photo-1487252665478-49b61b47f302",
      featured: false
    },
    {
      date: "15 Novembre 2024",
      category: "International",
      title: "Partenariat avec l'École Française de Londres",
      description: "Signature d'un accord d'échange scolaire permettant à nos élèves de découvrir le système éducatif britannique.",
      image: "photo-1506744038136-46273834b3fb",
      featured: false
    }
  ];

  const events = [
    {
      date: "20 Jan",
      title: "Journée Portes Ouvertes",
      time: "9h00 - 16h00",
      type: "Visite"
    },
    {
      date: "25 Jan",
      title: "Conférence Orientation",
      time: "18h30 - 20h00",
      type: "Conférence"
    },
    {
      date: "2 Fév",
      title: "Concours d'Éloquence",
      time: "14h00 - 17h00",
      type: "Concours"
    },
    {
      date: "10 Fév",
      title: "Festival des Arts",
      time: "15h00 - 19h00",
      type: "Culture"
    }
  ];

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

          {/* Articles à la une */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {news.filter(article => article.featured).map((article, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={`https://images.unsplash.com/${article.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                    alt={article.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {getCategoryIcon(article.category)}
                      <span className="ml-1">{article.category}</span>
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.date}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <Button variant="outline" size="sm">
                    Lire la suite
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Autres articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.filter(article => !article.featured).map((article, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={`https://images.unsplash.com/${article.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {getCategoryIcon(article.category)}
                      <span className="ml-1">{article.category}</span>
                    </span>
                    <span className="text-gray-500 text-xs">{article.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{article.description}</p>
                  <Button variant="ghost" size="sm" className="text-casa-blue hover:text-casa-blue">
                    Lire plus →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-casa-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">{event.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center justify-center text-gray-500 text-sm mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    {event.time}
                  </div>
                  <span className="inline-block bg-casa-red text-white px-3 py-1 rounded-full text-xs">
                    {event.type}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
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
