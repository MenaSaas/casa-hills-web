
import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AdminPhotosHeader } from '@/components/admin/AdminPhotosHeader';
import { PhotoFilters } from '@/components/admin/PhotoFilters';
import { PhotosGrid } from '@/components/admin/PhotosGrid';

interface Photo {
  id: string;
  filename: string;
  original_name: string;
  category: string;
  subcategory: string | null;
  title: string | null;
  description: string | null;
  file_path: string;
  file_size: number | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const AdminPhotos = () => {
  const { adminSession, isLoading } = useAdminAuth();
  const { toast } = useToast();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoadingPhotos, setIsLoadingPhotos] = useState(true);

  const categories = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'carousel', label: 'Carousel principal (Page d\'accueil)' },
    { value: 'school-levels', label: 'Cycles scolaires (Page d\'accueil)' },
    { value: 'news', label: 'Actualités et événements' },
    { value: 'philosophy', label: 'Philosophie - Activités pédagogiques' },
    { value: 'campus', label: 'Espaces du campus' },
    { value: 'facilities', label: 'Installations et équipements' }
  ];

  useEffect(() => {
    if (adminSession) {
      fetchPhotos();
    }
  }, [adminSession]);

  useEffect(() => {
    filterPhotos();
  }, [photos, searchTerm, selectedCategory]);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('school_photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les photos",
        variant: "destructive",
      });
    } finally {
      setIsLoadingPhotos(false);
    }
  };

  const filterPhotos = () => {
    let filtered = photos;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(photo => photo.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(photo =>
        photo.original_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPhotos(filtered);
  };

  const togglePhotoStatus = async (photoId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('school_photos')
        .update({ is_active: !currentStatus })
        .eq('id', photoId);

      if (error) throw error;

      setPhotos(photos.map(photo =>
        photo.id === photoId ? { ...photo, is_active: !currentStatus } : photo
      ));

      toast({
        title: "Statut modifié",
        description: `Photo ${!currentStatus ? 'activée' : 'désactivée'}`,
      });
    } catch (error) {
      console.error('Error toggling photo status:', error);
      toast({
        title: "Erreur",
        description: "Impossible de modifier le statut",
        variant: "destructive",
      });
    }
  };

  const deletePhoto = async (photoId: string, filePath: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('school-photos')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('school_photos')
        .delete()
        .eq('id', photoId);

      if (dbError) throw dbError;

      setPhotos(photos.filter(photo => photo.id !== photoId));

      toast({
        title: "Photo supprimée",
        description: "La photo a été supprimée avec succès",
      });
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la photo",
        variant: "destructive",
      });
    }
  };

  const getPhotoUrl = (filePath: string) => {
    const { data } = supabase.storage.from('school-photos').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const getCategoryDisplayName = (category: string) => {
    const categoryObj = categories.find(c => c.value === category);
    return categoryObj?.label || category;
  };

  if (isLoading || isLoadingPhotos) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-casa-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminPhotosHeader photoCount={filteredPhotos.length} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <PhotoFilters
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
        />

        <PhotosGrid
          photos={filteredPhotos}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onToggleStatus={togglePhotoStatus}
          onDelete={deletePhoto}
          getPhotoUrl={getPhotoUrl}
          getCategoryDisplayName={getCategoryDisplayName}
        />
      </div>
    </div>
  );
};

export default AdminPhotos;
