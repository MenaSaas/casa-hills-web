
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Target, Users, Globe, BookOpen, Star, Award, Lightbulb } from 'lucide-react';

const Philosophie = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-casa-red" />,
      title: "Bienveillance",
      description: "Un environnement chaleureux où chaque enfant se sent écouté, respecté et valorisé dans sa singularité."
    },
    {
      icon: <Target className="h-8 w-8 text-casa-blue" />,
      title: "Excellence",
      description: "Une exigence académique élevée alliée à un accompagnement personnalisé pour révéler le potentiel de chaque élève."
    },
    {
      icon: <Globe className="h-8 w-8 text-casa-red" />,
      title: "Ouverture",
      description: "Une éducation multiculturelle qui prépare nos élèves à devenir des citoyens du monde responsables."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-casa-blue" />,
      title: "Innovation",
      description: "Des méthodes pédagogiques modernes qui stimulent la créativité et l'esprit critique."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-casa-blue to-casa-red text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-display font-bold mb-6">
              Notre Philosophie
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-4xl mx-auto">
              Casa Hills place l'enfant au cœur de sa démarche éducative, cultivant 
              l'excellence dans un environnement bienveillant et multiculturel.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Notre Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Casa Hills s'engage à offrir une éducation d'excellence qui forme des citoyens 
                responsables, créatifs et ouverts sur le monde. Nous croyons que chaque enfant 
                est unique et mérite une attention particulière pour développer son plein potentiel.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Notre approche pédagogique allie tradition et innovation, rigueur académique 
                et épanouissement personnel, dans un environnement multiculturel enrichissant.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Élèves en activité"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Nos Valeurs Fondamentales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quatre piliers qui guident notre action éducative au quotidien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="mb-4 flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Approche pédagogique */}
      <section className="py-20 bg-casa-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Méthodes pédagogiques"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
                Notre Approche Pédagogique
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-casa-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Pédagogie active</h3>
                    <p className="text-gray-700">L'élève est acteur de ses apprentissages à travers des projets concrets et stimulants.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-casa-red rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Accompagnement personnalisé</h3>
                    <p className="text-gray-700">Chaque élève bénéficie d'un suivi individualisé adapté à son rythme et ses besoins.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-casa-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Excellence et bienveillance</h3>
                    <p className="text-gray-700">Une exigence éducative élevée dans un climat de confiance et de respect mutuel.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-casa-blue to-casa-red text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold mb-6">
            Rejoignez notre communauté éducative
          </h2>
          <p className="text-xl mb-8 text-blue-50">
            Découvrez comment Casa Hills peut accompagner votre enfant vers la réussite 
            dans un environnement d'exception.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-casa-blue hover:bg-gray-100">
              Prendre rendez-vous
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-casa-blue">
              Télécharger la brochure
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Philosophie;
