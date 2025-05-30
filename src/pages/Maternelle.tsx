
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Baby, Heart, Palette, Music, BookOpen, Users, Star } from 'lucide-react';

const Maternelle = () => {
  const activities = [
    {
      icon: <BookOpen className="h-8 w-8 text-casa-blue" />,
      title: "Éveil au Langage",
      description: "Développement du vocabulaire, expression orale et préparation à la lecture"
    },
    {
      icon: <Palette className="h-8 w-8 text-casa-blue" />,
      title: "Activités Créatives",
      description: "Dessin, peinture, collage et travaux manuels pour stimuler la créativité"
    },
    {
      icon: <Users className="h-8 w-8 text-casa-blue" />,
      title: "Socialisation",
      description: "Apprentissage du vivre ensemble, partage et respect des règles"
    },
    {
      icon: <Music className="h-8 w-8 text-casa-blue" />,
      title: "Éveil Musical",
      description: "Chansons, rythmique et découverte des instruments de musique"
    }
  ];

  const strengths = [
    {
      icon: <Heart className="h-8 w-8 text-casa-red" />,
      title: "Environnement Sécurisant",
      description: "Espaces adaptés aux tout-petits avec un encadrement bienveillant et attentionné."
    },
    {
      icon: <Baby className="h-8 w-8 text-casa-red" />,
      title: "Respect du Rythme",
      description: "Pédagogie adaptée à chaque enfant respectant son développement individuel."
    },
    {
      icon: <Users className="h-8 w-8 text-casa-red" />,
      title: "Équipe Spécialisée",
      description: "Éducatrices formées à la petite enfance pour un accompagnement professionnel."
    },
    {
      icon: <Palette className="h-8 w-8 text-casa-red" />,
      title: "Apprentissage Ludique",
      description: "Méthodes pédagogiques basées sur le jeu pour apprendre en s'amusant."
    }
  ];

  const objectives = [
    "Développer l'autonomie et la confiance en soi",
    "Stimuler la curiosité et l'envie d'apprendre",
    "Favoriser l'expression et la communication",
    "Apprendre les règles de vie en société",
    "Développer la motricité fine et globale",
    "Préparer l'entrée en primaire"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-300 via-purple-400 to-casa-blue text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-display font-bold mb-6">
                Maternelle
              </h1>
              <p className="text-xl mb-4 text-pink-100">
                Éveil et développement dans un cadre sécurisant
              </p>
              <p className="text-lg mb-8 text-pink-50 leading-relaxed">
                La maternelle Casa Hills offre un premier contact avec l'école dans un 
                environnement chaleureux et stimulant. Nous accompagnons chaque enfant 
                dans ses premiers apprentissages avec douceur et bienveillance.
              </p>
              <div className="flex items-center space-x-6 text-pink-100">
                <div className="text-center">
                  <div className="text-3xl font-bold">3-6</div>
                  <div className="text-sm">ans</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">18</div>
                  <div className="text-sm">élèves/classe</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">3</div>
                  <div className="text-sm">niveaux</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1576267423445-b2f96b2cd2d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Enfants de maternelle en activité créative"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-casa-blue/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Activités */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Nos Activités d'Éveil
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des activités variées et adaptées pour favoriser l'épanouissement 
              de chaque enfant dans toutes les dimensions de son développement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activities.map((activity, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="mb-4 flex justify-center">{activity.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{activity.title}</h3>
                  <p className="text-gray-600">{activity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Atouts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Les Atouts de Notre Maternelle
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un cadre privilégié pour les premiers pas dans la scolarité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {strengths.map((strength, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{strength.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{strength.title}</h3>
                      <p className="text-gray-600">{strength.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Objectifs */}
      <section className="py-20 bg-casa-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Objectifs de la Maternelle
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Notre maternelle vise l'épanouissement global de l'enfant en respectant 
                son rythme naturel de développement et en préparant son entrée en primaire.
              </p>
              <div className="space-y-4">
                {objectives.map((objective, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-casa-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-gray-700">{objective}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Enfants jouant ensemble en maternelle"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-gradient-to-r from-pink-400 to-purple-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold mb-6">
            Offrez le meilleur départ à votre enfant
          </h2>
          <p className="text-xl mb-8 text-pink-50">
            La maternelle Casa Hills : un environnement bienveillant pour grandir et s'épanouir.
          </p>
          <div className="space-y-2 text-pink-100">
            <p>Email : G.scasahills@gmail.com</p>
            <p>Téléphone : 05 22 75 93 04 / 06 31 03 02 60</p>
            <p>Adresse : Complexe Résidentiel Albadr, Sidi Bernoussi, Casablanca</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Maternelle;
