
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SchoolLevelPhoto {
  id: string;
  title: string | null;
  description: string | null;
  file_path: string;
  subcategory: string | null;
}

interface SchoolLevel {
  title: string;
  description: string;
  age: string;
  link: string;
  highlights: string[];
  subcategory: string;
  fallbackImage: string;
}

const SchoolLevelsSection = () => {
  const [photos, setPhotos] = useState<SchoolLevelPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const schoolLevels: SchoolLevel[] = [
    {
      title: "Maternelle",
      description: "Éveil et développement dans un cadre sécurisant",
      age: "3-6 ans",
      link: "/maternelle",
      highlights: ["Pédagogie Montessori", "Éveil artistique", "Programme trilingue"],
      subcategory: "Maternelle",
      fallbackImage: "/lovable-uploads/93b73cb2-8d92-41b9-9e6b-5d9894170e5a.png"
    },
    {
      title: "Primaire",
      description: "Fondamentaux solides et épanouissement personnel",
      age: "6-11 ans",
      link: "/primaire",
      highlights: ["Sciences expérimentales", "Sport et culture", "Langues vivantes"],
      subcategory: "Primaire",
      fallbackImage: "photo-1503676260728-1c00da094a0b"
    },
    {
      title: "Collège",
      description: "Approfondissement et ouverture sur le monde",
      age: "11-15 ans",
      link: "/college",
      highlights: ["Projets innovants", "Langues vivantes", "Orientation active"],
      subcategory: "Collège",
      fallbackImage: "photo-1522202176988-66273c2fd55f"
    },
    {
      title: "Lycée",
      description: "Excellence et préparation à l'avenir",
      age: "15-18 ans",
      link: "/lycee",
      highlights: ["Filières spécialisées", "Préparation supérieur", "Taux de réussite 98%"],
      subcategory: "Lycée",
      fallbackImage: "photo-1523240795612-9a054b0db644"
    }
  ];

  useEffect(() => {
    fetchSchoolLevelPhotos();
  }, []);

  const fetchSchoolLevelPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('school_photos')
        .select('id, title, description, file_path, subcategory')
        .eq('category', 'school-levels')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching school level photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPhotoUrl = (filePath: string) => {
    const { data } = supabase.storage.from('school-photos').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const getImageForLevel = (level: SchoolLevel) => {
    const adminPhoto = photos.find(photo => 
      photo.subcategory === level.subcategory
    );

    if (adminPhoto) {
      return {
        src: getPhotoUrl(adminPhoto.file_path),
        alt: adminPhoto.title || level.title,
        isAdmin: true
      };
    }

    // Fallback to static images
    if (level.fallbackImage.startsWith('/lovable-uploads/')) {
      return {
        src: level.fallbackImage,
        alt: level.title,
        isAdmin: false
      };
    }

    return {
      src: `https://images.unsplash.com/${level.fallbackImage}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`,
      alt: level.title,
      isAdmin: false
    };
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-casa-blue mb-4">
              Nos Cycles Scolaires
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un parcours éducatif complet et personnalisé, adapté à chaque étape 
              du développement de votre enfant.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-casa-blue mb-4 animate-fade-in">
            Nos Cycles Scolaires
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in">
            Un parcours éducatif complet et personnalisé, adapté à chaque étape 
            du développement de votre enfant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {schoolLevels.map((level, index) => {
            const image = getImageForLevel(level);
            return (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-fade-in border-casa-blue/20">
                <div className="aspect-w-16 aspect-h-12 relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-casa-blue/10"></div>
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-bold text-white bg-casa-red/80 backdrop-blur-sm px-3 py-1 rounded-full">
                      {level.age}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-casa-blue">{level.title}</h3>
                  <p className="text-gray-600 mb-4">{level.description}</p>
                  <div className="space-y-2 mb-4">
                    {level.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-casa-red mr-2" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                  <Link 
                    to={level.link}
                    className="inline-flex items-center text-casa-blue hover:text-casa-red font-medium transition-colors group"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SchoolLevelsSection;
