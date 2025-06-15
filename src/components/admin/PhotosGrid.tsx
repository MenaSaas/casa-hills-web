
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PhotoCard } from './PhotoCard';

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

interface PhotosGridProps {
  photos: Photo[];
  searchTerm: string;
  selectedCategory: string;
  onToggleStatus: (photoId: string, currentStatus: boolean) => void;
  onDelete: (photoId: string, filePath: string) => void;
  getPhotoUrl: (filePath: string) => string;
  getCategoryDisplayName: (category: string) => string;
}

export const PhotosGrid = ({
  photos,
  searchTerm,
  selectedCategory,
  onToggleStatus,
  onDelete,
  getPhotoUrl,
  getCategoryDisplayName
}: PhotosGridProps) => {
  if (photos.length === 0) {
    return (
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
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          photoUrl={getPhotoUrl(photo.file_path)}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
          getCategoryDisplayName={getCategoryDisplayName}
        />
      ))}
    </div>
  );
};
