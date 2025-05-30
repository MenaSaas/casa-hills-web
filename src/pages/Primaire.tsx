
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, Palette, Music, Calculator, Globe, Star } from 'lucide-react';

const Primaire = () => {
  const subjects = [
    {
      icon: <BookOpen className="h-8 w-8 text-casa-blue" />,
      title: "Français & Littérature",
      description: "Expression écrite et orale, lecture, découverte des grands auteurs"
    },
    {
      icon: <Calculator className="h-8 w-8 text-casa-blue" />,
      title: "Mathématiques",
      description: "Calcul, géométrie, résolution de problèmes et logique"
    },
    {
      icon: <Globe className="h-8 w-8 text-casa-blue" />,
      title: "Langues Vivantes",
      description: "Anglais, arabe - Communication et ouverture culturelle"
    },
    {
      icon: <Users className="h-8 w-8 text-casa-blue" />,
      title: "Sciences & Découverte",
      description: "Éveil scientifique, histoire, géographie et éducation civique"
    }
  ];

  const strengths = [
    {
      icon: <Palette className="h-8 w-8 text-casa-red" />,
      title: "Créativité & Expression",
      description: "Arts plastiques, théâtre et expression corporelle pour développer la créativité de chaque enfant."
    },
    {
      icon: <Music className="h-8 w-8 text-casa-red" />,
      title: "Éveil Musical",
      description: "Initiation musicale, chant et découverte des instruments pour une formation artistique complète."
    },
    {
      icon: <Users className="h-8 w-8 text-casa-red" />,
      title: "Vie en Communauté",
      description: "Apprentissage du vivre ensemble, respect des autres et développement de l'autonomie."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-casa-red" />,
      title: "Accompagnement Personnalisé",
      description: "Suivi individuel de chaque élève pour respecter son rythme et révéler ses talents."
    }
  ];

  const objectives = [
    "Maîtriser les fondamentaux : lecture, écriture, calcul",
    "Développer l'autonomie et la confiance en soi",
    "Stimuler la curiosité et l'esprit critique",
    "Apprendre à vivre ensemble et respecter autrui",
    "Découvrir ses talents et centres d'intérêt",
    "Préparer sereinement l'entrée au collège"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-400 via-casa-blue to-blue-500 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-display font-bold mb-6">
                Primaire
              </h1>
              <p className="text-xl mb-4 text-green-100">
                Fondamentaux solides et épanouissement personnel
              </p>
              <p className="text-lg mb-8 text-green-50 leading-relaxed">
                Le cycle primaire Casa Hills pose les bases essentielles de la scolarité. 
                Nous accompagnons chaque enfant dans l'acquisition des savoirs fondamentaux 
                tout en cultivant sa curiosité naturelle et sa joie d'apprendre.
              </p>
              <div className="flex items-center space-x-6 text-green-100">
                <div className="text-center">
                  <div className="text-3xl font-bold">6-11</div>
                  <div className="text-sm">ans</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">22</div>
                  <div className="text-sm">élèves/classe</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">5</div>
                  <div className="text-sm">niveaux</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Élèves de primaire en activité de lecture"
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
              Programme du Primaire
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un enseignement équilibré qui respecte le rythme de chaque enfant 
              tout en assurant l'acquisition des compétences essentielles.
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
              Les Atouts de Notre Primaire
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une pédagogie moderne qui place l'enfant au centre de ses apprentissages.
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
                Objectifs du Cycle Primaire
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nous visons l'épanouissement global de chaque enfant en construisant 
                des bases solides pour sa future réussite scolaire et personnelle.
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
                src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Salle de classe primaire moderne"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-gradient-to-r from-green-400 to-casa-blue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold mb-6">
            Accompagnez votre enfant vers la réussite
          </h2>
          <p className="text-xl mb-8 text-green-50">
            Le primaire Casa Hills : des bases solides pour un avenir brillant.
          </p>
          <div className="space-y-2 text-green-100">
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

export default Primaire;
