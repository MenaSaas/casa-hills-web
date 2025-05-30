import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, Globe, Microscope, Calculator, Palette, Music, Laptop, Heart, Star } from 'lucide-react';

const College = () => {
  const subjects = [
    {
      icon: <BookOpen className="h-8 w-8 text-casa-blue" />,
      title: "Lettres & Langues",
      description: "Français, arabe, anglais, espagnol - Expression et littérature"
    },
    {
      icon: <Calculator className="h-8 w-8 text-casa-blue" />,
      title: "Sciences Exactes",
      description: "Mathématiques, physique-chimie, logique et raisonnement"
    },
    {
      icon: <Microscope className="h-8 w-8 text-casa-blue" />,
      title: "Sciences Naturelles",
      description: "SVT, géologie, environnement et développement durable"
    },
    {
      icon: <Globe className="h-8 w-8 text-casa-blue" />,
      title: "Sciences Humaines",
      description: "Histoire-géographie, éducation civique et philosophie"
    }
  ];

  const strengths = [
    {
      icon: <Laptop className="h-8 w-8 text-casa-red" />,
      title: "Numérique & Innovation",
      description: "Salles équipées, tablettes, programmation et robotique pour préparer aux métiers de demain."
    },
    {
      icon: <Music className="h-8 w-8 text-casa-red" />,
      title: "Arts & Culture",
      description: "Théâtre, musique, arts plastiques pour développer la créativité et l'expression personnelle."
    },
    {
      icon: <Users className="h-8 w-8 text-casa-red" />,
      title: "Vie Scolaire",
      description: "Clubs, associations, projets solidaires pour une formation citoyenne complète."
    },
    {
      icon: <Globe className="h-8 w-8 text-casa-red" />,
      title: "Ouverture Internationale",
      description: "Échanges scolaires, certifications linguistiques, préparation aux études supérieures."
    }
  ];

  const objectives = [
    "Approfondir les connaissances fondamentales",
    "Développer l'esprit critique et l'autonomie",
    "Maîtriser les outils numériques avancés",
    "Préparer l'orientation vers le lycée",
    "Renforcer les compétences linguistiques",
    "Cultiver l'ouverture culturelle et citoyenne"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-500 via-casa-blue to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-display font-bold mb-6">
                Collège
              </h1>
              <p className="text-xl mb-4 text-purple-100">
                L'approfondissement et l'ouverture
              </p>
              <p className="text-lg mb-8 text-purple-50 leading-relaxed">
                Le collège Casa Hills marque une étape cruciale dans le parcours scolaire. 
                Nous accompagnons nos élèves dans l'approfondissement des connaissances 
                et la construction de leur projet d'orientation.
              </p>
              <div className="flex items-center space-x-6 text-purple-100">
                <div className="text-center">
                  <div className="text-3xl font-bold">11-15</div>
                  <div className="text-sm">ans</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">25</div>
                  <div className="text-sm">élèves/classe</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">4</div>
                  <div className="text-sm">niveaux</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Collégiens en activité collaborative"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-casa-blue/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Programme du Collège
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un curriculum complet qui prépare nos élèves aux défis du lycée 
              et aux études supérieures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {subjects.map((subject, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="mb-4 flex justify-center">{subject.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{subject.title}</h3>
                  <p className="text-gray-600">{subject.description}</p>
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
              Les Atouts de Notre Collège
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une formation complète qui va au-delà des programmes traditionnels.
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
                Objectifs du Cycle Collège
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nous préparons nos collégiens à devenir des lycéens autonomes et confiants, 
                prêts à affronter les défis académiques et personnels.
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
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Laboratoire de sciences"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-casa-blue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold mb-6">
            Préparez l'avenir de votre enfant
          </h2>
          <p className="text-xl mb-8 text-purple-50">
            Le collège Casa Hills : un tremplin vers l'excellence et la réussite 
            dans les études supérieures.
          </p>
          <div className="space-y-2 text-purple-100">
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

export default College;
