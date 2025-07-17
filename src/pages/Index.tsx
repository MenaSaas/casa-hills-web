import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomeCarousel from '@/components/HomeCarousel';
import SchoolLevelsSection from '@/components/SchoolLevelsSection';
import CookieBanner from '@/components/CookieBanner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, Globe, Users, Award, CheckCircle, Star, Trophy, Heart, MapPin, Phone, Mail } from 'lucide-react';
const Index = () => {
  const features = [{
    icon: <BookOpen className="h-8 w-8 text-casa-blue" />,
    title: "Excellence Académique",
    description: "Programme éducatif rigoureux alliant tradition française et ouverture internationale.",
    stats: "98% de réussite"
  }, {
    icon: <Globe className="h-8 w-8 text-casa-blue" />,
    title: "Environnement Multiculturel",
    description: "Diversité culturelle enrichissante préparant nos élèves à un monde globalisé.",
    stats: "International"
  }, {
    icon: <Users className="h-8 w-8 text-casa-blue" />,
    title: "Équipe Pédagogique Qualifiée",
    description: "Enseignants expérimentés et passionnés, formés aux meilleures pratiques éducatives.",
    stats: "1:12 ratio"
  }, {
    icon: <Award className="h-8 w-8 text-casa-blue" />,
    title: "Équipements Modernes",
    description: "Laboratoires, bibliothèque, espaces sportifs et technologiques de dernière génération.",
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
  return <div className="min-h-screen">
      <Header />
      
      {/* Premium Slogan Banner */}
      <section className="bg-gradient-to-r from-casa-blue/10 via-white to-casa-red/10 py-3 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg font-display font-semibold text-casa-blue tracking-wide">
              ✨ Une école, mille possibilités ✨
            </p>
          </div>
        </div>
      </section>

      {/* Hero Section with Enhanced Carousel */}
      <section className="relative bg-gradient-to-br from-casa-blue via-white to-casa-red">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="mb-4">
                <span className="inline-flex items-center px-4 py-2 bg-casa-blue/20 text-casa-blue rounded-full text-sm font-medium backdrop-blur-sm">
                  <Award className="h-4 w-4 mr-2" />
                  École privée d'excellence
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 text-casa-blue">École Privée
Casa Hills </h1>
              <p className="text-xl lg:text-2xl mb-4 text-casa-red font-medium">
                L'excellence éducative de la maternelle au lycée
              </p>
              <p className="text-lg mb-8 text-gray-700 leading-relaxed">
                Casa Hills est une école privée à Casablanca qui offre un enseignement d'excellence 
                de la maternelle au lycée. Notre établissement propose une éducation de qualité 
                dans un environnement multiculturel et bienveillant au cœur de Sidi Bernoussi, Casablanca. 
                Nous accompagnons chaque élève vers la réussite académique et l'épanouissement personnel 
                grâce à notre équipe pédagogique qualifiée et nos méthodes d'enseignement innovantes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/admissions">
                  <Button size="lg" className="bg-casa-red hover:bg-red-700 text-white px-8 py-4 text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Admission
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-2 border-casa-blue text-casa-blue hover:bg-casa-blue hover:text-white px-8 py-4 text-lg font-medium transition-all duration-300 hover:scale-105">
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
            {quickStats.map((stat, index) => <div key={index} className="text-center group">
                <div className="flex justify-center mb-3 text-casa-blue group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-casa-blue mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Why Choose Casa Hills - Enhanced */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-casa-blue mb-4 animate-fade-in">
              Notre Pédagogie d'Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
              Notre école privée à Casablanca propose une pédagogie innovante qui allie 
              enseignement maternelle primaire collège lycée et valeurs humaines. 
              Une éducation de qualité qui prépare vos enfants à un avenir prometteur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => <Card key={index} className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in group border-casa-blue/20">
                <CardContent className="p-0">
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-casa-blue">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="text-sm font-bold text-white bg-casa-red px-3 py-1 rounded-full inline-block">
                    {feature.stats}
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Institutional Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-casa-blue mb-8">
                Nos Cycles Scolaires
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-6">
                  Casa Hills, école privée de référence à Casablanca, accompagne vos enfants 
                  de la maternelle au lycée dans leur parcours éducatif. Notre enseignement 
                  maternelle primaire collège lycée s'appuie sur des programmes d'excellence 
                  adaptés à chaque tranche d'âge.
                </p>
                <p className="text-gray-700 mb-6">
                  Notre établissement scolaire propose une éducation de qualité dans un 
                  environnement multiculturel unique à Sidi Bernoussi, Casablanca. Chaque 
                  cycle est conçu pour développer les compétences académiques, sociales et 
                  personnelles de nos élèves.
                </p>
                <p className="text-gray-700">
                  L'admission scolaire Casablanca chez Casa Hills garantit l'accès à un 
                  enseignement bilingue français-arabe, préparant nos élèves aux défis 
                  du monde moderne tout en respectant nos valeurs culturelles.
                </p>
              </div>
              <div className="mt-8">
                <Link to="/admissions" className="inline-flex">
                  <Button className="bg-casa-blue hover:bg-blue-700 text-white">
                    Découvrir nos cycles
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Link to="/maternelle" className="group">
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 border-casa-blue/20 group-hover:border-casa-blue/40">
                    <CardContent className="p-0 text-center">
                      <div className="text-2xl mb-2">🌱</div>
                      <h3 className="font-semibold text-casa-blue">Maternelle</h3>
                      <p className="text-sm text-gray-600">3-6 ans</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/primaire" className="group">
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 border-casa-blue/20 group-hover:border-casa-blue/40">
                    <CardContent className="p-0 text-center">
                      <div className="text-2xl mb-2">📚</div>
                      <h3 className="font-semibold text-casa-blue">Primaire</h3>
                      <p className="text-sm text-gray-600">6-11 ans</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/college" className="group">
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 border-casa-blue/20 group-hover:border-casa-blue/40">
                    <CardContent className="p-0 text-center">
                      <div className="text-2xl mb-2">🎓</div>
                      <h3 className="font-semibold text-casa-blue">Collège</h3>
                      <p className="text-sm text-gray-600">11-15 ans</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link to="/lycee" className="group">
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 border-casa-blue/20 group-hover:border-casa-blue/40">
                    <CardContent className="p-0 text-center">
                      <div className="text-2xl mb-2">🏆</div>
                      <h3 className="font-semibold text-casa-blue">Lycée</h3>
                      <p className="text-sm text-gray-600">15-18 ans</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
              <div className="text-center p-6 bg-casa-blue/5 rounded-lg">
                <p className="text-casa-blue font-semibold">
                  Un parcours éducatif complet de 15 années d'excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-casa-blue mb-4">
              Notre Équipe Pédagogique
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des professionnels passionnés au service de l'éducation de qualité. 
              Notre équipe pédagogique qualifiée accompagne chaque élève dans sa réussite.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-casa-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-casa-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-casa-blue">Enseignants Qualifiés</h3>
                <p className="text-gray-600">
                  Diplômés des meilleures universités, nos enseignants apportent expertise 
                  et passion dans l'enseignement maternelle primaire collège lycée.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-casa-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-casa-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-casa-blue">Approche Multiculturelle</h3>
                <p className="text-gray-600">
                  Notre équipe internationale enrichit l'expérience éducative et prépare 
                  nos élèves aux enjeux d'un monde globalisé.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-casa-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-casa-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-casa-blue">Accompagnement Personnalisé</h3>
                <p className="text-gray-600">
                  Chaque élève bénéficie d'un suivi individualisé pour maximiser 
                  son potentiel et sa réussite scolaire.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/contact">
              <Button variant="outline" className="border-casa-blue text-casa-blue hover:bg-casa-blue hover:text-white">
                Rencontrer notre équipe
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Admissions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-casa-blue mb-8">
                Admissions et Inscriptions
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 mb-6">
                  L'admission scolaire Casablanca chez Casa Hills est ouverte toute l'année. 
                  Notre processus d'inscription est conçu pour accueillir les familles 
                  recherchant une école privée à Casablanca offrant excellence académique 
                  et valeurs humaines.
                </p>
                <p className="text-gray-700 mb-6">
                  Nous proposons des visites personnalisées de notre établissement situé 
                  à Sidi Bernoussi, Casablanca, pour vous présenter notre approche pédagogique 
                  et nos infrastructures modernes.
                </p>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-casa-blue mb-4">Pourquoi choisir Casa Hills ?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-casa-blue mr-3 flex-shrink-0" />
                      Éducation de qualité reconnue à Casablanca
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-casa-blue mr-3 flex-shrink-0" />
                      Enseignement bilingue français-arabe
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-casa-blue mr-3 flex-shrink-0" />
                      Ratio élève-professeur optimal (1:12)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-casa-blue mr-3 flex-shrink-0" />
                      Transport scolaire disponible
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/admissions">
                  <Button className="bg-casa-red hover:bg-red-700 text-white">
                    Dossier d'admission
                  </Button>
                </Link>
                <a href="https://www.men.gov.ma" target="_blank" rel="noopener noreferrer" className="inline-flex">
                  
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-casa-blue to-casa-red p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-6">Inscriptions ouvertes 2025-2026</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span>Frais de dossier</span>
                  <span className="font-semibold">500 DH</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span>Visite personnalisée</span>
                  <span className="font-semibold">Gratuite</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span>Test d'évaluation</span>
                  <span className="font-semibold">Inclus</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span>Réponse sous</span>
                  <span className="font-semibold">48h</span>
                </div>
              </div>
              <div className="mt-8 text-center">
                <p className="text-white/90 mb-4">Contactez-nous dès maintenant</p>
                <Link to="/contact">
                  <Button className="bg-white text-casa-blue hover:bg-gray-100 w-full">
                    Prendre rendez-vous
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-casa-blue mb-4">
              Nous Contacter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions 
              concernant l'admission scolaire Casablanca et notre projet éducatif.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-casa-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-casa-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-casa-blue">Adresse</h3>
                <p className="text-gray-600">
                  Complexe Résidentiel Albadr<br />
                  Sidi Bernoussi, Casablanca<br />
                  Maroc
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-casa-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-casa-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-casa-blue">Téléphone</h3>
                <p className="text-gray-600">
                  05 22 75 93 04<br />
                  +212 6 63 51 44 32
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-casa-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-casa-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-casa-blue">Email</h3>
                <p className="text-gray-600">
                  G.scasahills@gmail.com
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Link to="/contact">
              <Button className="bg-casa-red hover:bg-red-700 text-white px-8 py-4 text-lg">
                Formulaire de contact
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-casa-blue to-casa-red text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold mb-6 animate-fade-in">
            Rejoignez la famille Casa Hills
          </h2>
          <p className="text-xl mb-8 text-white/90 animate-fade-in">
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
    </div>;
};
export default Index;