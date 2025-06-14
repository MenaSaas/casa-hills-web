
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ImageFile {
  name: string;
  publicUrl: string;
  path: string;
  size?: number;
  createdAt?: string;
}

export const useImageGallery = (folder?: string) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from('casa-hills-images')
        .list(folder || '', {
          limit: 100,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) {
        throw error;
      }

      const imageFiles: ImageFile[] = data
        .filter(file => {
          const ext = file.name.split('.').pop()?.toLowerCase();
          return ext && ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext);
        })
        .map(file => {
          const filePath = folder ? `${folder}/${file.name}` : file.name;
          const { data: { publicUrl } } = supabase.storage
            .from('casa-hills-images')
            .getPublicUrl(filePath);

          return {
            name: file.name,
            publicUrl,
            path: filePath,
            size: file.metadata?.size,
            createdAt: file.created_at
          };
        });

      setImages(imageFiles);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [folder]);

  return {
    images,
    isLoading,
    refetch: fetchImages
  };
};
