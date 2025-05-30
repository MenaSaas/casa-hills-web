
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Palette, Music, BookOpen, Play } from 'lucide-react';

const Maternelle = () => {
  const activities = [
    {
      icon: <Play className="h-8 w-8 text-casa-blue" />,
      title: "Jeux Éducatifs",
      description: "Apprentissage par le jeu pour développer la créativité et l'autonomie"
    },
    {
      icon: <Palette className="h-8 w-8 text-casa-blue" />,
      title: "Arts Plastiques",
      description: "Expression artistique et développement de la motricité fine"
    },
    {
      icon: <Music className="h-8 w-8 text-casa-blue" />,
      title: "Éveil Musical",
      description: "Découverte des sons, rythmes et instruments de musique"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-casa-blue" />,
      title: "Pré-lecture",
      description: "Initiation aux lettres et aux sons dans un cadre ludique"
    }
  ];

  const objectives = [
    "Développer l'autonomie et la confiance en soi",
    "Favoriser la socialisation et le respect des autres",
    "Stimuler la curiosité et l'envie d'apprendre",
    "Développer la motricité fine et globale",
    "Initier aux premiers apprentissages académiques",
    "Cultiver la créativité et l'expression personnelle"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-400 via-purple-400 to-casa-blue text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-display font-bold mb-6">
                Maternelle
              </h1>
              <p className="text-xl mb-4 text-pink-100">
                L'éveil dans la bienveillance
              </p>
              <p className="text-lg mb-8 text-pink-50 leading-relaxed">
                Notre école maternelle offre un environnement sécurisant et stimulant 
                où chaque enfant peut s'épanouir à son rythme. Nous accompagnons 
                les premiers pas de votre enfant vers l'apprentissage.
              </p>
              <div className="flex items-center space-x-6 text-pink-100">
                <div className="text-center">
                  <div className="text-3xl font-bold">3-6</div>
                  <div className="text-sm">ans</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">15</div>
                  <div className="text-sm">élèves/classe</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">4</div>
                  <div className="text-sm">classes</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Enfants en maternelle"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Notre Approche */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Notre Approche Pédagogique
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une pédagogie active centrée sur l'enfant, respectueuse de son rythme 
              et de sa personnalité unique.
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

      {/* Objectifs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Activités maternelle"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Nos Objectifs Éducatifs
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nous nous concentrons sur le développement global de l'enfant, 
                en cultivant ses compétences sociales, émotionnelles et cognitives.
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

      {/* Environnement */}
      <section className="py-20 bg-casa-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Un Environnement Adapté
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nos espaces sont spécialement conçus pour répondre aux besoins 
              des jeunes enfants et favoriser leur épanouissement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-casa-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Classes à Effectif Réduit</h3>
                <p className="text-gray-600">
                  Maximum 15 élèves par classe pour un suivi personnalisé 
                  et une attention individualisée.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-casa-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Espaces de Jeu</h3>
                <p className="text-gray-600">
                  Aires de jeux sécurisées et équipements adaptés pour 
                  le développement moteur et social.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0 text-center">
                <div className="w-16 h-16 bg-casa-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Accompagnement Bienveillant</h3>
                <p className="text-gray-600">
                  Équipe pédagogique formée à la petite enfance et 
                  accompagnement psycho-éducatif.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-casa-blue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold mb-6">
            Inscrivez votre enfant en maternelle
          </h2>
          <p className="text-xl mb-8 text-pink-50">
            Offrez à votre enfant le meilleur départ dans sa scolarité. 
            Découvrez notre programme maternelle lors d'une visite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-casa-blue hover:bg-gray-100">
              Inscription maternelle
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

export default Maternelle;
