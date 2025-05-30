
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Star, Users, Globe, Award, BookOpen, Heart, ArrowRight } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-casa-blue" />,
      title: "Excellence Académique",
      description: "Programme éducatif rigoureux alliant tradition française et ouverture internationale."
    },
    {
      icon: <Globe className="h-8 w-8 text-casa-blue" />,
      title: "Environnement Multiculturel",
      description: "Diversité culturelle enrichissante préparant nos élèves à un monde globalisé."
    },
    {
      icon: <Users className="h-8 w-8 text-casa-blue" />,
      title: "Équipe Pédagogique Qualifiée",
      description: "Enseignants expérimentés et passionnés, formés aux meilleures pratiques éducatives."
    },
    {
      icon: <Award className="h-8 w-8 text-casa-blue" />,
      title: "Équipements Modernes",
      description: "Laboratoires, bibliothèque, espaces sportifs et technologiques de dernière génération."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Alami",
      role: "Mère d'élève - Primaire",
      content: "Casa Hills a transformé l'apprentissage de ma fille. L'approche bienveillante et l'excellence pédagogique sont remarquables.",
      rating: 5
    },
    {
      name: "Mohamed Benali",
      role: "Père d'élève - Collège",
      content: "L'ouverture internationale et la qualité de l'encadrement préparent parfaitement nos enfants à leur avenir.",
      rating: 5
    },
    {
      name: "Fatima Chraibi",
      role: "Mère d'élève - Lycée",
      content: "Un environnement stimulant où chaque élève peut s'épanouir et révéler son potentiel. Nous recommandons vivement.",
      rating: 5
    }
  ];

  const schoolLevels = [
    {
      title: "Maternelle",
      description: "Éveil et développement dans un cadre sécurisant",
      age: "3-6 ans",
      image: "photo-1581091226825-a6a2a5aee158",
      link: "/maternelle"
    },
    {
      title: "Primaire", 
      description: "Fondamentaux solides et épanouissement personnel",
      age: "6-11 ans",
      image: "photo-1519389950473-47ba0277781c",
      link: "/primaire"
    },
    {
      title: "Collège",
      description: "Approfondissement et ouverture sur le monde",
      age: "11-15 ans", 
      image: "photo-1486312338219-ce68d2c6f44d",
      link: "/college"
    },
    {
      title: "Lycée",
      description: "Excellence et préparation aux études supérieures",
      age: "15-18 ans",
      image: "photo-1605810230434-7631ac76ec81",
      link: "/lycee"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-casa-blue via-blue-600 to-casa-red text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
                Casa Hills
              </h1>
              <p className="text-xl lg:text-2xl mb-4 text-blue-100">
                Une école, mille possibilités
              </p>
              <p className="text-lg mb-8 text-blue-50 leading-relaxed">
                Découvrez une éducation d'excellence dans un environnement multiculturel 
                et bienveillant au cœur de Casablanca. De la maternelle au lycée, 
                nous accompagnons chaque élève vers la réussite.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-casa-red hover:bg-red-700 text-lg px-8">
                  Inscrivez votre enfant
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-casa-blue text-lg px-8">
                  Visite virtuelle
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={`https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                alt="Élèves de Casa Hills en activité"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-casa-blue">500+</div>
                    <div className="text-sm text-gray-600">Élèves</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-casa-blue">15</div>
                    <div className="text-sm text-gray-600">Ans d'expérience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Casa Hills */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Pourquoi choisir Casa Hills ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une éducation d'exception qui prépare vos enfants à un avenir prometteur 
              dans un monde en constante évolution.
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

      {/* School Levels */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Nos Cycles Scolaires
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un parcours éducatif complet de la maternelle au lycée, 
              adapté à chaque étape du développement de votre enfant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {schoolLevels.map((level, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={`https://images.unsplash.com/${level.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                    alt={level.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="mb-2">
                    <span className="text-sm font-medium text-casa-blue bg-blue-50 px-3 py-1 rounded-full">
                      {level.age}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{level.title}</h3>
                  <p className="text-gray-600 mb-4">{level.description}</p>
                  <Link 
                    to={level.link}
                    className="inline-flex items-center text-casa-blue hover:text-blue-700 font-medium"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-casa-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Ce que disent nos parents
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La confiance de nos familles est notre plus belle récompense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-casa-blue to-casa-red text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold mb-6">
            Rejoignez la famille Casa Hills
          </h2>
          <p className="text-xl mb-8 text-blue-50">
            Offrez à votre enfant une éducation d'exception dans un environnement 
            bienveillant et stimulant. Les inscriptions sont ouvertes !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-casa-blue hover:bg-gray-100 text-lg px-8">
              Demander une brochure
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-casa-blue text-lg px-8">
              Prendre un rendez-vous
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
