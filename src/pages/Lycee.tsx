
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, Globe, GraduationCap, Trophy, Target, Brain, Lightbulb } from 'lucide-react';

const Lycee = () => {
  const tracks = [
    {
      icon: <BookOpen className="h-8 w-8 text-casa-blue" />,
      title: "Filière Littéraire",
      description: "Langues, littérature, philosophie et sciences humaines"
    },
    {
      icon: <Brain className="h-8 w-8 text-casa-blue" />,
      title: "Filière Scientifique",
      description: "Mathématiques, physique, chimie, SVT et sciences de l'ingénieur"
    },
    {
      icon: <Globe className="h-8 w-8 text-casa-blue" />,
      title: "Filière Économique",
      description: "Économie, gestion, sociologie et mathématiques appliquées"
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-casa-blue" />,
      title: "Préparation Supérieur",
      description: "Orientation et préparation aux concours d'entrée"
    }
  ];

  const achievements = [
    {
      stat: "98%",
      title: "Taux de Réussite au Bac",
      description: "Excellence reconnue avec mentions"
    },
    {
      stat: "95%",
      title: "Poursuite d'Études",
      description: "Intégration dans les meilleures universités"
    },
    {
      stat: "15+",
      title: "Langues & Certifications",
      description: "TOEFL, DELF, Cambridge, Cervantes"
    },
    {
      stat: "20+",
      title: "Partenariats Universités",
      description: "Accords avec établissements prestigieux"
    }
  ];

  const services = [
    {
      icon: <Target className="h-8 w-8 text-casa-red" />,
      title: "Orientation Personnalisée",
      description: "Accompagnement individuel pour choisir la voie qui correspond aux talents et aspirations de chaque élève."
    },
    {
      icon: <Trophy className="h-8 w-8 text-casa-red" />,
      title: "Préparation aux Concours",
      description: "Classes préparatoires et soutien spécialisé pour les concours d'entrée aux grandes écoles."
    },
    {
      icon: <Users className="h-8 w-8 text-casa-red" />,
      title: "Projets d'Excellence",
      description: "Olympiades, concours scientifiques, Model UN, projets entrepreneuriaux et culturels."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-casa-red" />,
      title: "Innovation Pédagogique",
      description: "Méthodes d'enseignement modernes, technologies éducatives et pédagogie inversée."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-casa-red via-orange-500 to-yellow-500 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-display font-bold mb-6">
                Lycée
              </h1>
              <p className="text-xl mb-4 text-orange-100">
                Excellence et préparation à l'avenir
              </p>
              <p className="text-lg mb-8 text-orange-50 leading-relaxed">
                Le lycée Casa Hills représente l'aboutissement d'un parcours d'excellence. 
                Nous préparons nos élèves aux défis des études supérieures et à leur 
                future carrière professionnelle.
              </p>
              <div className="flex items-center space-x-6 text-orange-100">
                <div className="text-center">
                  <div className="text-3xl font-bold">15-18</div>
                  <div className="text-sm">ans</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">28</div>
                  <div className="text-sm">élèves/classe</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">3</div>
                  <div className="text-sm">filières</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Lycéens en cours"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filières */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Nos Filières d'Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des parcours spécialisés pour révéler les talents et préparer 
              aux meilleures poursuites d'études.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tracks.map((track, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="mb-4 flex justify-center">{track.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{track.title}</h3>
                  <p className="text-gray-600">{track.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Résultats */}
      <section className="py-20 bg-casa-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">
              Nos Résultats d'Excellence
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Des performances qui témoignent de la qualité de notre enseignement 
              et de l'engagement de nos équipes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-white/10 border-white/20 text-white p-6 text-center">
                <CardContent className="p-0">
                  <div className="text-4xl font-bold text-yellow-300 mb-2">{achievement.stat}</div>
                  <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-blue-100 text-sm">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Accompagnement Personnalisé
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des services d'excellence pour guider chaque élève vers la réussite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{service.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-casa-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Témoignages d'Anciens Élèves
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="p-0">
                <p className="text-gray-700 mb-4 italic">
                  "Casa Hills m'a donné les clés pour intégrer une grande école d'ingénieur. 
                  L'accompagnement personnalisé a été décisif."
                </p>
                <div>
                  <div className="font-semibold">Youssef Bennani</div>
                  <div className="text-sm text-gray-600">Promotion 2022 - École Centrale Paris</div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <p className="text-gray-700 mb-4 italic">
                  "Grâce à Casa Hills, j'ai développé mon esprit critique et ma confiance. 
                  Aujourd'hui je réussis mes études de médecine."
                </p>
                <div>
                  <div className="font-semibold">Leila Mansouri</div>
                  <div className="text-sm text-gray-600">Promotion 2021 - Faculté de Médecine</div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <p className="text-gray-700 mb-4 italic">
                  "L'ouverture internationale de Casa Hills m'a préparé à intégrer 
                  une université canadienne prestigieuse."
                </p>
                <div>
                  <div className="font-semibold">Omar Filali</div>
                  <div className="text-sm text-gray-600">Promotion 2020 - Université McGill</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-casa-red to-orange-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold mb-6">
            Préparez votre enfant aux études supérieures
          </h2>
          <p className="text-xl mb-8 text-orange-50">
            Le lycée Casa Hills : votre passerelle vers l'excellence académique 
            et la réussite professionnelle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-casa-red hover:bg-gray-100">
              Inscription lycée
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-casa-red">
              Rencontrer nos conseillers
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Lycee;
