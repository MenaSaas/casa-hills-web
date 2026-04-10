import { Card, CardContent } from '@/components/ui/card';
import { Trophy, TrendingUp, Award, Globe, BookOpen } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const SchoolResults = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const results = [
    {
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      title: "Taux de Réussite",
      value: "98%",
      description: "Baccalauréat marocain 2024",
      trend: "+3% vs 2023"
    },
    {
      icon: <Award className="h-8 w-8 text-casa-blue" />,
      title: "Mentions",
      value: "85%",
      description: "Mention Bien et Très Bien",
      trend: "+8% vs 2023"
    },
    {
      icon: <Globe className="h-8 w-8 text-emerald-500" />,
      title: "Études Supérieures",
      value: "95%",
      description: "CPGE, ENCG, ENSA, UM6P",
      trend: "Grandes écoles marocaines"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-casa-red" />,
      title: "Certifications",
      value: "92%",
      description: "Langues internationales",
      trend: "DELF, Cambridge, Goethe"
    }
  ];

  const achievements = [
    "🏆 1er Prix Olympiades Nationales de Mathématiques 2024",
    "🌟 Certification Cambridge English School 2024",
    "📚 Partenariat avec UM6P et ISCAE",
    "🎭 Festival Régional du Théâtre Scolaire - Médaille d'Or",
    "🔬 Concours National des Sciences - 3 prix d'excellence",
    "🇲🇦 Meilleure école privée de la région Casablanca-Settat 2024"
  ];

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl font-display font-bold text-foreground mb-4">
            Nos Résultats d'Excellence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des performances qui témoignent de la qualité de notre enseignement 
            et de l'engagement de nos élèves
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {results.map((result, index) => (
            <Card 
              key={index} 
              className={`p-6 text-center hover:shadow-lg transition-all duration-500 hover:scale-105 group ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {result.icon}
                </div>
                <div className="text-4xl font-bold text-foreground mb-2">{result.value}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{result.title}</h3>
                <p className="text-muted-foreground text-sm mb-2">{result.description}</p>
                <div className="flex items-center justify-center space-x-1 text-emerald-600 text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  <span>{result.trend}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className={`bg-muted/50 rounded-2xl p-8 transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display font-bold text-foreground mb-4">
              Nos Dernières Distinctions
            </h3>
            <p className="text-muted-foreground">
              Reconnaissances nationales et internationales de l'excellence Casa Hills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className="bg-background rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 border"
              >
                <p className="text-sm text-foreground font-medium">{achievement}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-casa-blue text-white px-6 py-3 rounded-full font-medium">
            <Trophy className="h-5 w-5 mr-2" />
            Classée parmi les meilleures écoles privées du Maroc
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolResults;
