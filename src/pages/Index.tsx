
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomeCarousel from '@/components/HomeCarousel';
import ParentTestimonials from '@/components/ParentTestimonials';
import SchoolResults from '@/components/SchoolResults';
import CookieBanner from '@/components/CookieBanner';
import NewsSection from '@/components/NewsSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Globe, Users, Award, ArrowRight, Star, Trophy, Heart, CheckCircle } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-casa-blue" />,
      title: "Excellence Académique",
      description: "Programme éducatif rigoureux alliant tradition française et ouverture internationale.",
      stats: "98% de réussite"
    },
    {
      icon: <Globe className="h-8 w-8 text-casa-blue" />,
      title: "Environnement Multiculturel",
      description: "Diversité culturelle enrichissante préparant nos élèves à un monde globalisé.",
      stats: "15 nationalités"
    },
    {
      icon: <Users className="h-8 w-8 text-casa-blue" />,
      title: "Équipe Pédagogique Qualifiée",
      description: "Enseignants expérimentés et passionnés, formés aux meilleures pratiques éducatives.",
      stats: "1:12 ratio"
    },
    {
      icon: <Award className="h-8 w-8 text-casa-blue" />,
      title: "Équipements Modernes",
      description: "Laboratoires, bibliothèque, espaces sportifs et technologiques de dernière génération.",
      stats: "100% équipé"
    }
  ];

  const schoolLevels = [
    {
      title: "Maternelle",
      description: "Éveil et développement dans un cadre sécurisant",
      age: "3-6 ans",
      image: "photo-1544776527-59eca25b6645",
      link: "/maternelle",
      highlights: ["Pédagogie Montessori", "Éveil artistique", "Bilinguisme précoce"]
    },
    {
      title: "Primaire", 
      description: "Fondamentaux solides et épanouissement personnel",
      age: "6-11 ans",
      image: "photo-1503676260728-1c00da094a0b",
      link: "/primaire",
      highlights: ["Programme français", "Sciences expérimentales", "Sport et culture"]
    },
    {
      title: "Collège",
      description: "Approfondissement et ouverture sur le monde",
      age: "11-15 ans", 
      image: "photo-1522202176988-66273c2fd55f",
      link: "/college",
      highlights: ["Projets innovants", "Langues vivantes", "Orientation active"]
    },
    {
      title: "Lycée",
      description: "Excellence et préparation aux études supérieures",
      age: "15-18 ans",
      image: "photo-1523050854058-8df90110c9f1",
      link: "/lycee",
      highlights: ["Prépa grandes écoles", "Programmes internationaux", "Taux de réussite 98%"]
    }
  ];

  const quickStats = [
    { number: "500+", label: "Élèves épanouis", icon: <Users className="h-6 w-6" /> },
    { number: "15", label: "Années d'excellence", icon: <Trophy className="h-6 w-6" /> },
    { number: "98%", label: "Taux de réussite", icon: <Star className="h-6 w-6" /> },
    { number: "95%", label: "Satisfaction parents", icon: <Heart className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Premium Slogan Banner */}
      <section className="bg-gradient-to-r from-casa-blue/10 via-white to-casa-red/10 py-3 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg font-display font-semibold text-gray-800 tracking-wide">
              ✨ Une école, mille possibilités ✨
            </p>
          </div>
        </div>
      </section>

      {/* Hero Section with Enhanced Carousel */}
      <section className="relative bg-gradient-to-br from-casa-blue via-blue-600 to-casa-red text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="mb-4">
                <span className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium text-white backdrop-blur-sm">
                  <Award className="h-4 w-4 mr-2" />
                  École privée d'excellence
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6">
                Casa Hills
              </h1>
              <p className="text-xl lg:text-2xl mb-4 text-blue-100 font-medium">
                L'excellence éducative de la maternelle au lycée
              </p>
              <p className="text-lg mb-8 text-blue-50 leading-relaxed">
                Découvrez une éducation d'exception dans un environnement multiculturel 
                et bienveillant au cœur de Casablanca. Nous accompagnons chaque élève 
                vers la réussite et l'épanouissement personnel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/admissions">
                  <Button size="lg" className="bg-casa-red hover:bg-red-700 text-white px-8 py-4 text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Inscription en ligne
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-casa-blue px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105">
                    Prendre rendez-vous
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <HomeCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white shadow-lg relative -mt-8 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-3 text-casa-blue group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Casa Hills - Enhanced */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4 animate-fade-in">
              Pourquoi choisir Casa Hills ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
              Une éducation d'exception qui prépare vos enfants à un avenir prometteur 
              dans un monde en constante évolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in group">
                <CardContent className="p-0">
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="text-sm font-bold text-casa-blue bg-blue-50 px-3 py-1 rounded-full inline-block">
                    {feature.stats}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* School Levels - Enhanced */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4 animate-fade-in">
              Nos Cycles Scolaires
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
              Un parcours éducatif complet et personnalisé, adapté à chaque étape 
              du développement de votre enfant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {schoolLevels.map((level, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-fade-in">
                <div className="aspect-w-16 aspect-h-12 relative">
                  <img
                    src={`https://images.unsplash.com/${level.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                    alt={level.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-casa-blue/10"></div>
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-bold text-white bg-casa-blue/80 backdrop-blur-sm px-3 py-1 rounded-full">
                      {level.age}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{level.title}</h3>
                  <p className="text-gray-600 mb-4">{level.description}</p>
                  <div className="space-y-2 mb-4">
                    {level.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                  <Link 
                    to={level.link}
                    className="inline-flex items-center text-casa-blue hover:text-blue-700 font-medium transition-colors group"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* School Results Section */}
      <SchoolResults />

      {/* Parent Testimonials */}
      <ParentTestimonials />

      {/* News Section */}
      <NewsSection />

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-casa-blue to-casa-red text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold mb-6 animate-fade-in">
            Rejoignez la famille Casa Hills
          </h2>
          <p className="text-xl mb-8 text-blue-50 animate-fade-in">
            Offrez à votre enfant une éducation d'exception dans un environnement 
            bienveillant et stimulant. Inscriptions ouvertes pour 2024-2025.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/admissions">
              <Button size="lg" className="bg-white text-casa-blue hover:bg-gray-100 px-8 py-4 text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <CheckCircle className="h-5 w-5 mr-2" />
                S'inscrire maintenant
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-casa-blue px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;
