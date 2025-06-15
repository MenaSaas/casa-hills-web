
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Trash2 } from 'lucide-react';

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

interface PhotoCardProps {
  photo: Photo;
  photoUrl: string;
  onToggleStatus: (photoId: string, currentStatus: boolean) => void;
  onDelete: (photoId: string, filePath: string) => void;
  getCategoryDisplayName: (category: string) => string;
}

export const PhotoCard = ({ 
  photo, 
  photoUrl, 
  onToggleStatus, 
  onDelete, 
  getCategoryDisplayName 
}: PhotoCardProps) => {
  return (
    <Card className={`overflow-hidden ${!photo.is_active ? 'opacity-60' : ''}`}>
      <div className="aspect-w-16 aspect-h-12 relative">
        <img
          src={photoUrl}
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
              onClick={() => onToggleStatus(photo.id, photo.is_active)}
            >
              {photo.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(photo.id, photo.file_path)}
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
  );
};
