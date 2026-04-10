import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const ParentTestimonials = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const testimonials = [
    {
      name: "Mme Fatima Alaoui",
      child: "Mère de Yasmine (3ème année primaire)",
      text: "Casa Hills a transformé l'apprentissage de ma fille. L'approche bienveillante et l'excellence pédagogique sont remarquables. Yasmine s'épanouit chaque jour davantage.",
      rating: 5,
      initials: "FA",
      color: "bg-blue-500"
    },
    {
      name: "M. Karim Bensouda",
      child: "Père de Amine (3ème collège)",
      text: "Une école exceptionnelle qui prépare vraiment nos enfants à l'avenir. L'équipe pédagogique est à l'écoute et les résultats au brevet régional parlent d'eux-mêmes.",
      rating: 5,
      initials: "KB",
      color: "bg-emerald-500"
    },
    {
      name: "Mme Aicha Bennani",
      child: "Mère de Omar (2ème Bac)",
      text: "Grâce à Casa Hills, Omar a développé sa confiance en lui et ses compétences. Il vise maintenant les classes préparatoires et les grandes écoles marocaines.",
      rating: 5,
      initials: "AB",
      color: "bg-amber-500"
    },
    {
      name: "M. Rachid El Idrissi",
      child: "Père de Salma (1ère année primaire)",
      text: "L'environnement multiculturel et la qualité de l'enseignement font de Casa Hills un choix évident. Le programme marocain enrichi par les langues est un vrai atout.",
      rating: 5,
      initials: "RE",
      color: "bg-rose-500"
    }
  ];

  return (
    <section className="py-20 bg-muted/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl font-display font-bold text-foreground mb-4">
            Ce que disent nos parents
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            La confiance de nos familles est notre plus belle récompense
          </p>
          <div className="flex justify-center items-center mt-6 space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-lg font-semibold text-muted-foreground">4.9/5 (127 avis)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className={`p-6 hover:shadow-lg transition-all duration-500 hover:scale-105 relative ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-0">
                <div className="absolute -top-2 -left-2 bg-casa-blue text-white p-2 rounded-full">
                  <Quote className="h-4 w-4" />
                </div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-full ${testimonial.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.child}</div>
                  </div>
                </div>

                <div className="flex space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-muted-foreground text-sm italic leading-relaxed">
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
            className="inline-flex items-center text-casa-blue hover:text-blue-700 font-medium text-lg transition-colors"
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
