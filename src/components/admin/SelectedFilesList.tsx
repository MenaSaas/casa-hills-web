
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UploadFileCard } from './UploadFileCard';

interface UploadFile {
  file: File;
  preview: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
}

interface Category {
  value: string;
  label: string;
  description: string;
  maxFiles?: number;
}

interface SelectedFilesListProps {
  uploadFiles: UploadFile[];
  categories: Category[];
  subcategories: Record<string, string[]>;
  isUploading: boolean;
  onUpdate: (index: number, field: keyof UploadFile, value: string) => void;
  onRemove: (index: number) => void;
  onUpload: () => void;
}

export const SelectedFilesList = ({ 
  uploadFiles, 
  categories, 
  subcategories, 
  isUploading, 
  onUpdate, 
  onRemove, 
  onUpload 
}: SelectedFilesListProps) => {
  if (uploadFiles.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Photos sélectionnées ({uploadFiles.length})
        </h2>
        <Button
          onClick={onUpload}
          disabled={isUploading}
          className="bg-casa-blue hover:bg-blue-700"
        >
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Upload en cours...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Confirmer l'upload
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {uploadFiles.map((uploadFile, index) => (
          <UploadFileCard
            key={index}
            uploadFile={uploadFile}
            index={index}
            categories={categories}
            subcategories={subcategories}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};
