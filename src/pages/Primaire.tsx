
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, Globe, Calculator, Palette, Music, Heart, Trophy } from 'lucide-react';

const Primaire = () => {
  const subjects = [
    {
      icon: <BookOpen className="h-8 w-8 text-casa-blue" />,
      title: "Français",
      description: "Maîtrise de la langue, littérature et expression écrite et orale"
    },
    {
      icon: <Calculator className="h-8 w-8 text-casa-blue" />,
      title: "Mathématiques",
      description: "Logique, raisonnement et résolution de problèmes"
    },
    {
      icon: <Globe className="h-8 w-8 text-casa-blue" />,
      title: "Langues",
      description: "Arabe, anglais et découverte de l'espagnol"
    },
    {
      icon: <Palette className="h-8 w-8 text-casa-blue" />,
      title: "Arts & Culture",
      description: "Expression artistique et éveil culturel"
    }
  ];

  const objectives = [
    "Acquérir les fondamentaux en français et mathématiques",
    "Développer l'autonomie et la confiance en soi",
    "Cultiver la curiosité et l'esprit critique",
    "Maîtriser les outils numériques de base",
    "Découvrir les sciences et l'environnement",
    "Développer les compétences sociales et civiques"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-400 via-blue-500 to-casa-blue text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-display font-bold mb-6">
                Primaire
              </h1>
              <p className="text-xl mb-4 text-green-100">
                Les fondamentaux pour grandir
              </p>
              <p className="text-lg mb-8 text-green-50 leading-relaxed">
                Le cycle primaire de Casa Hills pose les bases solides des apprentissages 
                fondamentaux. Nous accompagnons chaque élève dans sa découverte du savoir 
                et le développement de son autonomie.
              </p>
              <div className="flex items-center space-x-6 text-green-100">
                <div className="text-center">
                  <div className="text-3xl font-bold">6-11</div>
                  <div className="text-sm">ans</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">20</div>
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
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Élèves en primaire"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programme */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Notre Programme Primaire
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un enseignement équilibré qui développe les compétences fondamentales 
              et l'épanouissement personnel de chaque élève.
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

      {/* Objectifs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Activités primaire"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Nos Objectifs Pédagogiques
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Au primaire, nous mettons l'accent sur l'acquisition des savoirs 
                fondamentaux tout en développant la personnalité de chaque enfant.
              </p>
              <div className="space-y-4">
                {objectives.map((objective, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-casa-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-gray-700">{objective}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Méthodes */}
      <section className="py-20 bg-casa-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Nos Méthodes Pédagogiques
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des approches variées pour s'adapter aux différents styles d'apprentissage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-casa-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Travail Collaboratif</h3>
                <p className="text-gray-600">
                  Projets de groupe pour développer l'entraide et 
                  les compétences sociales.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-casa-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Apprentissage Ludique</h3>
                <p className="text-gray-600">
                  Jeux éducatifs et activités créatives pour 
                  apprendre en s'amusant.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-casa-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Suivi Personnalisé</h3>
                <p className="text-gray-600">
                  Accompagnement individualisé pour révéler 
                  le potentiel de chaque élève.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-casa-blue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold mb-6">
            Inscrivez votre enfant en primaire
          </h2>
          <p className="text-xl mb-8 text-green-50">
            Donnez à votre enfant les meilleures bases pour réussir sa scolarité. 
            Découvrez notre approche pédagogique innovante.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-casa-blue hover:bg-gray-100">
              Inscription primaire
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-casa-blue">
              Visiter l'école
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Primaire;
