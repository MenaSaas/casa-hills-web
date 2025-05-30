
import { Instagram } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const InstagramGallery = () => {
  // Pour une intégration réelle, il faudrait utiliser l'API Instagram Basic Display
  // Ici, nous créons une galerie statique avec des liens vers le compte
  const mockPosts = [
    {
      id: 1,
      image: "photo-1503454537195-1dcabb73ffb9",
      caption: "Journée créative en maternelle",
      url: "https://www.instagram.com/ecolecasahills/"
    },
    {
      id: 2,
      image: "photo-1497486751825-1233686d5d80", 
      caption: "Cours de lecture en primaire",
      url: "https://www.instagram.com/ecolecasahills/"
    },
    {
      id: 3,
      image: "photo-1486312338219-ce68d2c6f44d",
      caption: "Projet scientifique au collège", 
      url: "https://www.instagram.com/ecolecasahills/"
    },
    {
      id: 4,
      image: "photo-1522661067900-9b6b4c892583",
      caption: "Préparation au bac au lycée",
      url: "https://www.instagram.com/ecolecasahills/"
    },
    {
      id: 5,
      image: "photo-1571019613454-1cb2f99b2d8b",
      caption: "Infrastructure moderne Casa Hills",
      url: "https://www.instagram.com/ecolecasahills/"
    },
    {
      id: 6,
      image: "photo-1509062522246-3755977927d7",
      caption: "Équipements pédagogiques de qualité",
      url: "https://www.instagram.com/ecolecasahills/"
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

        {/* Desktop Grid - 4 columns */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-4 mb-8">
          {mockPosts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl aspect-square bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <img
                src={`https://images.unsplash.com/${post.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                  <Instagram className="h-8 w-8 text-white mx-auto mb-2" />
                  <p className="text-white text-sm font-medium px-4">{post.caption}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile/Tablet Grid - 2 columns */}
        <div className="grid grid-cols-2 lg:hidden gap-3 mb-8">
          {mockPosts.slice(0, 4).map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-lg aspect-square bg-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <img
                src={`https://images.unsplash.com/${post.image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80`}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 w-full">
                  <p className="text-white text-xs font-medium text-center">{post.caption}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://www.instagram.com/ecolecasahills/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-casa-blue hover:text-blue-700 font-medium transition-colors group"
          >
            <span>Voir plus sur Instagram</span>
            <Instagram className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
