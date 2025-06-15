
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileUploadZone } from '@/components/admin/FileUploadZone';
import { CategoriesGuide } from '@/components/admin/CategoriesGuide';
import { SelectedFilesList } from '@/components/admin/SelectedFilesList';
import { usePhotoUpload } from '@/hooks/usePhotoUpload';
import { categories, subcategories } from '@/data/photoCategories';

const AdminPhotoUpload = () => {
  const { adminSession, isLoading } = useAdminAuth();
  const {
    uploadFiles,
    isUploading,
    handleFileSelect,
    removeFile,
    updateFile,
    handleUpload
  } = usePhotoUpload(adminSession?.id);

  if (isLoading) {
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
              <Link to="/admin/photos">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-display font-bold text-casa-blue">
                  Ajouter des Photos
                </h1>
                <p className="text-gray-600">
                  Importer et organiser de nouvelles photos par section du site
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FileUploadZone onFileSelect={handleFileSelect} />
        <CategoriesGuide categories={categories} />
        <SelectedFilesList
          uploadFiles={uploadFiles}
          categories={categories}
          subcategories={subcategories}
          isUploading={isUploading}
          onUpdate={updateFile}
          onRemove={removeFile}
          onUpload={handleUpload}
        />
      </main>
    </div>
  );
};

export default AdminPhotoUpload;
