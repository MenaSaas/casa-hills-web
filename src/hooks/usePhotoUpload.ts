
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface UploadFile {
  file: File;
  preview: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
}

export const usePhotoUpload = (adminSessionId?: string) => {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newFile: UploadFile = {
            file,
            preview: event.target?.result as string,
            title: file.name.replace(/\.[^/.]+$/, ''),
            description: '',
            category: 'campus',
            subcategory: ''
          };
          setUploadFiles(prev => [...prev, newFile]);
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const removeFile = (index: number) => {
    setUploadFiles(prev => prev.filter((_, i) => i !== index));
  };

  const updateFile = (index: number, field: keyof UploadFile, value: string) => {
    setUploadFiles(prev => 
      prev.map((file, i) => 
        i === index ? { ...file, [field]: value } : file
      )
    );
  };

  const handleUpload = async () => {
    if (uploadFiles.length === 0) {
      toast({
        title: "Aucun fichier",
        description: "Veuillez sélectionner au moins un fichier",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      for (const uploadFile of uploadFiles) {
        const fileExt = uploadFile.file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${uploadFile.category}/${fileName}`;

        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from('school-photos')
          .upload(filePath, uploadFile.file);

        if (uploadError) throw uploadError;

        // Save to database
        const { error: dbError } = await supabase
          .from('school_photos')
          .insert({
            filename: fileName,
            original_name: uploadFile.file.name,
            category: uploadFile.category,
            subcategory: uploadFile.subcategory || null,
            title: uploadFile.title || null,
            description: uploadFile.description || null,
            file_path: filePath,
            file_size: uploadFile.file.size,
            mime_type: uploadFile.file.type,
            uploaded_by: adminSessionId
          });

        if (dbError) throw dbError;
      }

      toast({
        title: "Upload réussi",
        description: `${uploadFiles.length} photo(s) ajoutée(s) avec succès`,
      });

      navigate('/admin/photos');
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Erreur d'upload",
        description: "Une erreur est survenue lors de l'upload",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadFiles,
    isUploading,
    handleFileSelect,
    removeFile,
    updateFile,
    handleUpload
  };
};
