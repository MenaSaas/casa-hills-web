
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File, folder?: string): Promise<string | null> => {
    if (!file) return null;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Erreur",
        description: "Type de fichier non supporté. Utilisez JPG, PNG, WebP ou GIF.",
        variant: "destructive"
      });
      return null;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erreur",
        description: "Le fichier est trop volumineux. Taille maximale : 5MB.",
        variant: "destructive"
      });
      return null;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      const { data, error } = await supabase.storage
        .from('casa-hills-images')
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('casa-hills-images')
        .getPublicUrl(data.path);

      toast({
        title: "Succès",
        description: "Image uploadée avec succès !",
      });

      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Erreur",
        description: "Échec de l'upload de l'image.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = async (filePath: string): Promise<boolean> => {
    try {
      const { error } = await supabase.storage
        .from('casa-hills-images')
        .remove([filePath]);

      if (error) {
        throw error;
      }

      toast({
        title: "Succès",
        description: "Image supprimée avec succès !",
      });

      return true;
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Erreur",
        description: "Échec de la suppression de l'image.",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    uploadImage,
    deleteImage,
    isUploading
  };
};
