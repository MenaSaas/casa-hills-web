
import { Instagram } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const InstagramGallery = () => {
  // Pour une intégration réelle, il faudrait utiliser l'API Instagram Basic Display
  // Ici, nous créons une galerie statique avec des liens vers le compte
  const mockPosts = [
    {
      id: 1,
      image: "photo-1503454537195-1dcabb73ffb9",
      caption: "Journée créative en maternelle"
    },
    {
      id: 2,
      image: "photo-1497486751825-1233686d5d80",
      caption: "Cours de lecture en primaire"
    },
    {
      id: 3,
      image: "photo-1486312338219-ce68d2c6f44d",
      caption: "Projet scientifique au collège"
    },
    {
      id: 4,
      image: "photo-1522661067900-9b6b4c892583",
      caption: "Préparation au bac au lycée"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Instagram className="h-8 w-8 text-casa-blue" />
            <h2 className="text-4xl font-display font-bold text-gray-900">
              Suivez-nous sur Instagram
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Découvrez la vie quotidienne à Casa Hills à travers nos publications
          </p>
          <a
            href="https://www.instagram.com/ecolecasahills/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform"
          >
            <Instagram className="h-5 w-5" />
            <span>@ecolecasahills</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={`https://images.unsplash.com/${post.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                    alt={post.caption}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Instagram className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">{post.caption}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/ecolecasahills/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-casa-blue hover:text-blue-700 font-medium"
          >
            <span>Voir plus sur Instagram</span>
            <Instagram className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
