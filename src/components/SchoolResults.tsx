
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, TrendingUp, Award, Users, Globe, BookOpen } from 'lucide-react';

const SchoolResults = () => {
  const results = [
    {
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      title: "Taux de Réussite",
      value: "98%",
      description: "Baccalauréat 2024",
      trend: "+3% vs 2023"
    },
    {
      icon: <Award className="h-8 w-8 text-blue-500" />,
      title: "Mentions",
      value: "85%",
      description: "Mention Bien et Très Bien",
      trend: "+8% vs 2023"
    },
    {
      icon: <Globe className="h-8 w-8 text-green-500" />,
      title: "Études Supérieures",
      value: "95%",
      description: "Intégration universités",
      trend: "Écoles prestigieuses"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-500" />,
      title: "Certifications",
      value: "92%",
      description: "Langues internationales",
      trend: "TOEFL, DELF, Cambridge"
    }
  ];

  const achievements = [
    "🏆 1er Prix Olympiades de Mathématiques Casablanca 2024",
    "🌟 Certification Cambridge English School 2024",
    "📚 Partenariat avec HEC Paris et Polytechnique",
    "🎭 Festival International du Théâtre Scolaire - Médaille d'Or",
    "🔬 Concours National des Sciences - 3 prix d'excellence",
    "🎨 Exposition Internationale d'Arts Plastiques - Mention spéciale"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Nos Résultats d'Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des performances qui témoignent de la qualité de notre enseignement 
            et de l'engagement de nos élèves
          </p>
        </div>

        {/* Main Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {results.map((result, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-0">
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {result.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{result.value}</div>
                <h3 className="text-lg font-semibold mb-2">{result.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{result.description}</p>
                <div className="flex items-center justify-center space-x-1 text-green-600 text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  <span>{result.trend}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="bg-gradient-to-r from-casa-blue/5 to-casa-red/5 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Nos Dernières Distinctions
            </h3>
            <p className="text-gray-600">
              Reconnaissances nationales et internationales de l'excellence Casa Hills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <p className="text-sm text-gray-700 font-medium">{achievement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
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
