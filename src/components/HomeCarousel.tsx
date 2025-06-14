
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CarouselPhoto {
  id: string;
  title: string | null;
  description: string | null;
  file_path: string;
  display_order: number;
}

const HomeCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [photos, setPhotos] = useState<CarouselPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback slides si aucune photo n'est trouvée
  const fallbackSlides = [
    {
      image: "photo-1509062522246-3755977927d7",
      title: "Excellence Académique",
      subtitle: "Un enseignement de qualité dans un environnement bienveillant"
    },
    {
      image: "photo-1513475382585-d06e58bcb0e0",
      title: "Environnement Multiculturel",
      subtitle: "Diversité culturelle et ouverture sur le monde"
    },
    {
      image: "photo-1571019613454-1cb2f99b2d8b",
      title: "Infrastructure Moderne",
      subtitle: "Équipements de dernière génération pour l'épanouissement"
    }
  ];

  useEffect(() => {
    fetchCarouselPhotos();
  }, []);

  useEffect(() => {
    if (photos.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % photos.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [photos.length]);

  const fetchCarouselPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('school_photos')
        .select('id, title, description, file_path, display_order')
        .eq('category', 'carousel')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      
      if (data && data.length > 0) {
        setPhotos(data);
      }
    } catch (error) {
      console.error('Error fetching carousel photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPhotoUrl = (filePath: string) => {
    const { data } = supabase.storage.from('school-photos').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const nextSlide = () => {
    const slideCount = photos.length > 0 ? photos.length : fallbackSlides.length;
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    const slideCount = photos.length > 0 ? photos.length : fallbackSlides.length;
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  if (isLoading) {
    return (
      <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl bg-gray-200 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-casa-blue"></div>
      </div>
    );
  }

  // Utiliser les photos admin si disponibles, sinon les images de fallback
  const slides = photos.length > 0 ? photos : fallbackSlides;
  const isUsingAdminPhotos = photos.length > 0;

  return (
    <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl">
      {slides.map((slide, index) => (
        <div
          key={isUsingAdminPhotos ? (slide as CarouselPhoto).id : index}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <img
            src={isUsingAdminPhotos 
              ? getPhotoUrl((slide as CarouselPhoto).file_path)
              : `https://images.unsplash.com/${(slide as any).image}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`
            }
            alt={isUsingAdminPhotos 
              ? (slide as CarouselPhoto).title || 'Photo de l\'école'
              : (slide as any).title
            }
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-3xl font-display font-bold mb-4 animate-fade-in">
                {isUsingAdminPhotos 
                  ? (slide as CarouselPhoto).title || 'Casa Hills'
                  : (slide as any).title
                }
              </h3>
              <p className="text-lg animate-fade-in">
                {isUsingAdminPhotos 
                  ? (slide as CarouselPhoto).description || 'Excellence éducative'
                  : (slide as any).subtitle
                }
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-casa-blue/10"></div>
        </div>
      ))}
      
      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCarousel;
