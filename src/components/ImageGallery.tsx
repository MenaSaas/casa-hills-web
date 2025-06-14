
import { useState } from 'react';
import { Trash2, Copy, ExternalLink } from 'lucide-react';
import { useImageGallery } from '@/hooks/useImageGallery';
import { useImageUpload } from '@/hooks/useImageUpload';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface ImageGalleryProps {
  folder?: string;
  showUploader?: boolean;
  onImageSelect?: (url: string) => void;
}

const ImageGallery = ({ folder, showUploader = false, onImageSelect }: ImageGalleryProps) => {
  const { images, isLoading, refetch } = useImageGallery(folder);
  const { deleteImage } = useImageUpload();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDelete = async (path: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      const success = await deleteImage(path);
      if (success) {
        refetch();
      }
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL copiée",
      description: "L'URL de l'image a été copiée dans le presse-papiers.",
    });
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Taille inconnue';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-casa-blue"></div>
        <span className="ml-2">Chargement des images...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {images.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Aucune image trouvée dans ce dossier.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card 
              key={image.path} 
              className={`group cursor-pointer transition-all ${
                selectedImage === image.publicUrl ? 'ring-2 ring-casa-blue' : ''
              }`}
              onClick={() => {
                setSelectedImage(image.publicUrl);
                if (onImageSelect) {
                  onImageSelect(image.publicUrl);
                }
              }}
            >
              <CardContent className="p-3">
                <div className="aspect-square relative overflow-hidden rounded-md bg-gray-100">
                  <img
                    src={image.publicUrl}
                    alt={image.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
                
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate flex-1">
                      {image.name}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {formatFileSize(image.size)}
                    </Badge>
                  </div>
                  
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(image.publicUrl);
                      }}
                      className="flex-1"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(image.publicUrl, '_blank');
                      }}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(image.path);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
