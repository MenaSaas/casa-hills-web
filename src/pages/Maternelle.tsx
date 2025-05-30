
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Users, Book, Heart, Sparkles, ArrowRight } from 'lucide-react';

const Maternelle = () => {
  const features = [
    {
      icon: <Heart className="h-8 w-8 text-casa-blue" />,
      title: "Environnement Bienveillant",
      description: "Un cadre sécurisant et chaleureux où chaque enfant peut s'épanouir en toute confiance."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-casa-blue" />,
      title: "Éveil et Créativité",
      description: "Activités ludiques et créatives pour stimuler l'imagination et la curiosité naturelle."
    },
    {
      icon: <Users className="h-8 w-8 text-casa-blue" />,
      title: "Socialisation",
      description: "Apprentissage du vivre-ensemble et développement des compétences sociales."
    },
    {
      icon: <Book className="h-8 w-8 text-casa-blue" />,
      title: "Préparation au Primaire",
      description: "Acquisition progressive des prérequis pour une transition harmonieuse vers le primaire."
    }
  ];

  const activities = [
    {
      title: "Motricité",
      description: "Développement des capacités motrices fines et globales",
      image: "photo-1503454537195-1dcabb73ffb9"
    },
    {
      title: "Arts Plastiques",
      description: "Expression créative à travers la peinture, le dessin et le modelage",
      image: "photo-1544717297-fa95b6ee9643"
    },
    {
      title: "Éveil Musical",
      description: "Découverte des sons, rythmes et premiers instruments",
      image: "photo-1522661067900-9b6b4c892583"
    },
    {
      title: "Jeux Éducatifs",
      description: "Apprentissage par le jeu et manipulation d'objets",
      image: "photo-1497486751825-1233686d5d80"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-casa-blue to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                3-6 ans
              </span>
              <h1 className="text-5xl font-display font-bold mb-6">
                Maternelle
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Premiers pas vers l'apprentissage dans un environnement adapté aux tout-petits.
                Éveil, créativité et socialisation au cœur de notre pédagogie.
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center bg-casa-red hover:bg-red-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors"
              >
                Nous contacter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Enfants en classe de maternelle"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Notre Approche Pédagogique
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une pédagogie adaptée aux besoins des jeunes enfants, favorisant leur développement global
              dans un environnement stimulant et sécurisant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Activités et Apprentissages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un programme riche et varié pour accompagner chaque enfant dans son développement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activities.map((activity, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={`https://images.unsplash.com/${activity.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                    alt={activity.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                  <p className="text-gray-600">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programme Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Programme Détaillé
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl text-casa-blue">Petite Section (3-4 ans)</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-2 text-gray-600">
                  <li>• Adaptation à la vie en collectivité</li>
                  <li>• Développement du langage oral</li>
                  <li>• Activités sensorielles et motrices</li>
                  <li>• Premiers graphismes</li>
                  <li>• Découverte des couleurs et formes</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl text-casa-blue">Moyenne Section (4-5 ans)</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-2 text-gray-600">
                  <li>• Enrichissement du vocabulaire</li>
                  <li>• Initiation à l'écriture</li>
                  <li>• Découverte des nombres</li>
                  <li>• Activités artistiques diversifiées</li>
                  <li>• Développement de l'autonomie</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl text-casa-blue">Grande Section (5-6 ans)</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-2 text-gray-600">
                  <li>• Préparation à la lecture</li>
                  <li>• Approche des mathématiques</li>
                  <li>• Expression écrite simple</li>
                  <li>• Projets collectifs</li>
                  <li>• Préparation au CP</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl text-casa-blue">Horaires & Organisation</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-2 text-gray-600">
                  <li>• 8h00 - 12h00 : Activités matinales</li>
                  <li>• 12h00 - 14h00 : Pause déjeuner</li>
                  <li>• 14h00 - 16h30 : Activités après-midi</li>
                  <li>• Sieste pour les petits</li>
                  <li>• Encadrement personnalisé</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-casa-blue to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold mb-6">
            Accompagnons ensemble les premiers pas de votre enfant
          </h2>
          <p className="text-xl mb-8 text-blue-50">
            Notre équipe bienveillante est là pour accueillir votre enfant dans les meilleures conditions.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center bg-white text-casa-blue hover:bg-gray-100 px-8 py-3 rounded-md text-lg font-medium transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Maternelle;
