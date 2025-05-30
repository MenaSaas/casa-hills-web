
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const ParentTestimonials = () => {
  const testimonials = [
    {
      name: "Mme Fatima Alaoui",
      child: "Mère de Yasmine (CE2)",
      text: "Casa Hills a transformé l'apprentissage de ma fille. L'approche bienveillante et l'excellence pédagogique sont remarquables. Yasmine s'épanouit chaque jour davantage.",
      rating: 5,
      image: "photo-1544725176-7c40e5a71c5e"
    },
    {
      name: "M. Jean-Pierre Martin",
      child: "Père de Thomas (3ème)",
      text: "Une école exceptionnelle qui prépare vraiment nos enfants à l'avenir. L'équipe pédagogique est à l'écoute et les résultats parlent d'eux-mêmes.",
      rating: 5,
      image: "photo-1507003211169-0a1dd7228f2d"
    },
    {
      name: "Mme Aicha Bennani",
      child: "Mère de Omar (Terminale)",
      text: "Grâce à Casa Hills, Omar a développé sa confiance en lui et ses compétences. Il est maintenant prêt pour les meilleures universités.",
      rating: 5,
      image: "photo-1494790108755-2616b612b550"
    },
    {
      name: "M. David Cohen",
      child: "Père de Sarah (CP)",
      text: "L'environnement multiculturel et la qualité de l'enseignement font de Casa Hills un choix évident pour notre famille. Sarah adore aller à l'école !",
      rating: 5,
      image: "photo-1472099645785-5658abf4ff4e"
    }
  ];

  return (
    <section className="py-20 bg-casa-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Ce que disent nos parents
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La confiance de nos familles est notre plus belle récompense
          </p>
          <div className="flex justify-center items-center mt-6 space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-lg font-semibold text-gray-700">4.9/5 (127 avis)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 relative">
              <CardContent className="p-0">
                <div className="absolute -top-2 -left-2 bg-casa-blue text-white p-2 rounded-full">
                  <Quote className="h-4 w-4" />
                </div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={`https://images.unsplash.com/${testimonial.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.child}</div>
                  </div>
                </div>

                <div className="flex space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 text-sm italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://www.google.com/search?q=casa+hills+casablanca+avis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-casa-blue hover:text-blue-700 font-medium text-lg"
          >
            Voir tous les avis Google
            <Star className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ParentTestimonials;
