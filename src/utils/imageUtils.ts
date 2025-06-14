
import { supabase } from '@/integrations/supabase/client';

/**
 * Génère l'URL publique d'une image stockée dans Supabase
 */
export const getImageUrl = (path: string): string => {
  const { data } = supabase.storage
    .from('casa-hills-images')
    .getPublicUrl(path);
  
  return data.publicUrl;
};

/**
 * Upload une image vers Supabase Storage
 */
export const uploadImageToSupabase = async (
  file: File, 
  folder?: string
): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    const { data, error } = await supabase.storage
      .from('casa-hills-images')
      .upload(filePath, file);

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    return getImageUrl(data.path);
  } catch (error) {
    console.error('Upload error:', error);
    return null;
  }
};

/**
 * Supprime une image de Supabase Storage
 */
export const deleteImageFromSupabase = async (path: string): Promise<boolean> => {
  try {
    const { error } = await supabase.storage
      .from('casa-hills-images')
      .remove([path]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
};

/**
 * Liste toutes les images d'un dossier
 */
export const listImages = async (folder?: string) => {
  try {
    const { data, error } = await supabase.storage
      .from('casa-hills-images')
      .list(folder || '', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) {
      console.error('List error:', error);
      return [];
    }

    return data.filter(file => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      return ext && ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext);
    });
  } catch (error) {
    console.error('List error:', error);
    return [];
  }
};
