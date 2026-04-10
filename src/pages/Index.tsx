import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomeCarousel from '@/components/HomeCarousel';
import SchoolLevelsSection from '@/components/SchoolLevelsSection';
import SchoolResults from '@/components/SchoolResults';
import ParentTestimonials from '@/components/ParentTestimonials';
import NewsSection from '@/components/NewsSection';
import CookieBanner from '@/components/CookieBanner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Globe, Users, Award, CheckCircle, Star, Trophy, Heart } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const Index = () => {
  const { ref: featuresRef, isInView: featuresInView } = useInView();
  const { ref: statsRef, isInView: statsInView } = useInView();

  const features = [{
    icon: <BookOpen className="h-8 w-8 text-casa-blue" />,
    title: "Excellence Académique",
    description: "Programme marocain enrichi conforme aux directives du Ministère de l'Éducation Nationale, avec ouverture internationale.",
    stats: "98% de réussite au Bac"
  }, {
    icon: <Globe className="h-8 w-8 text-casa-blue" />,
    title: "Trilinguisme",
    description: "Enseignement en arabe, français et anglais dès la maternelle pour une formation complète et compétitive.",
    stats: "3 langues dès le préscolaire"
  }, {
    icon: <Users className="h-8 w-8 text-casa-blue" />,
    title: "Équipe Qualifiée",
    description: "Enseignants diplômés et expérimentés, formés aux meilleures pratiques pédagogiques marocaines et internationales.",
    stats: "Ratio 1:12"
  }, {
    icon: <Award className="h-8 w-8 text-casa-blue" />,
    title: "Équipements Modernes",
    description: "Laboratoires, bibliothèque, salles multimédias et espaces sportifs au cœur de Sidi Bernoussi, Casablanca.",
    stats: "100% équipé"
  }];

  const quickStats = [{
    number: "500+",
    label: "Élèves épanouis",
    icon: <Users className="h-6 w-6" />
  }, {
    number: "15",
    label: "Années d'excellence",
    icon: <Trophy className="h-6 w-6" />
  }, {
    number: "98%",
    label: "Taux de réussite",
    icon: <Star className="h-6 w-6" />
  }, {
    number: "95%",
    label: "Satisfaction parents",
    icon: <Heart className="h-6 w-6" />
  }];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section — clean blue background */}
      <section className="relative bg-gradient-to-br from-casa-blue/5 via-background to-casa-blue/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="mb-4">
                <span className="inline-flex items-center px-4 py-2 bg-casa-blue/10 text-casa-blue rounded-full text-sm font-medium">
                  <Award className="h-4 w-4 mr-2" />
                  École privée d'excellence à Casablanca
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 text-foreground">
                Casa Hills
              </h1>
              <p className="text-xl lg:text-2xl mb-4 text-casa-red font-medium">
                Là où chaque élève révèle son potentiel
              </p>
              <p className="text-lg mb-8 text-muted-foreground leading-relaxed">
                De la maternelle au lycée, offrez à votre enfant un parcours d'excellence 
                dans un environnement trilingue et bienveillant à Sidi Bernoussi, Casablanca.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/admissions">
                  <Button size="lg" className="bg-casa-red hover:bg-red-700 text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Pré-inscription 2025-2026
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-2 border-casa-blue text-casa-blue hover:bg-casa-blue hover:text-white px-8 py-4 text-lg font-medium transition-all duration-300">
                    Visiter l'école
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
      <section className="py-12 bg-background shadow-sm relative -mt-4 z-10" ref={statsRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {quickStats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center group transition-all duration-500 ${
                  statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-3 text-casa-blue group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-casa-blue mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Casa Hills */}
      <section className="py-20 bg-muted/50" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-700 ${featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">
              Pourquoi choisir Casa Hills ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Une éducation d'exception qui prépare vos enfants à un avenir prometteur 
              dans un monde en constante évolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`p-6 text-center hover:shadow-xl transition-all duration-500 hover:scale-105 group border-border ${
                  featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <div className="text-sm font-bold text-white bg-casa-red px-3 py-1 rounded-full inline-block">
                    {feature.stats}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* School Results */}
      <SchoolResults />

      {/* School Levels */}
      <SchoolLevelsSection />

      {/* Parent Testimonials */}
      <ParentTestimonials />

      {/* News Section */}
      <NewsSection />

      {/* CTA Section — differentiated buttons */}
      <section className="py-20 bg-casa-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-casa-blue to-blue-900"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold mb-6">
            Rejoignez la famille Casa Hills
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Offrez à votre enfant une éducation d'exception dans un environnement bienveillant et stimulant. Inscriptions ouvertes pour 2025-2026.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/admissions">
              <Button size="lg" className="bg-casa-red hover:bg-red-700 text-white px-8 py-4 text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300">
                <CheckCircle className="h-5 w-5 mr-2" />
                Pré-inscription 2025-2026
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-casa-blue px-8 py-4 text-lg font-medium transition-all duration-300">
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
