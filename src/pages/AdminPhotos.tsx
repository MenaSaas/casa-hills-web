import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  Search,
  Filter,
  Upload,
  Edit,
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-display font-bold text-casa-blue">
                  Gestion des Photos
                </h1>
                <p className="text-gray-600">
                  {filteredPhotos.length} photo(s) trouvée(s)
                </p>
              </div>
            </div>
            <Link to="/admin/photos/upload">
              <Button className="bg-casa-blue hover:bg-blue-700">
                <Upload className="h-4 w-4 mr-2" />
                Ajouter des photos
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par nom, titre ou description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-80">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <Card key={photo.id} className={`overflow-hidden ${!photo.is_active ? 'opacity-60' : ''}`}>
              <div className="aspect-w-16 aspect-h-12 relative">
                <img
                  src={getPhotoUrl(photo.file_path)}
                  alt={photo.title || photo.original_name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant={photo.category === 'carousel' ? 'destructive' : 'secondary'} className="text-xs">
                    {getCategoryDisplayName(photo.category)}
                  </Badge>
                </div>
                {photo.subcategory && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="text-xs bg-white/90">
                      {photo.subcategory}
                    </Badge>
                  </div>
                )}
                <div className="absolute bottom-2 right-2">
                  <Badge variant={photo.is_active ? 'success' : 'secondary'} className="text-xs">
                    {photo.is_active ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-2 truncate">
                  {photo.title || photo.original_name}
                </h3>
                {photo.description && (
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {photo.description}
                  </p>
                )}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePhotoStatus(photo.id, photo.is_active)}
                    >
                      {photo.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deletePhoto(photo.id, photo.file_path)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-xs text-gray-500">
                    {Math.round((photo.file_size || 0) / 1024)} KB
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Upload className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg font-medium">Aucune photo trouvée</p>
              <p className="text-sm">
                {searchTerm || selectedCategory !== 'all'
                  ? 'Essayez de modifier vos filtres de recherche'
                  : 'Commencez par ajouter des photos à votre galerie'
                }
              </p>
            </div>
            {(!searchTerm && selectedCategory === 'all') && (
              <Link to="/admin/photos/upload">
                <Button className="bg-casa-blue hover:bg-blue-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Ajouter des photos
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPhotos;
