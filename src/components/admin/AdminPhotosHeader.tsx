
import { ArrowLeft, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface AdminPhotosHeaderProps {
  photoCount: number;
}

export const AdminPhotosHeader = ({ photoCount }: AdminPhotosHeaderProps) => {
  return (
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
                {photoCount} photo(s) trouvée(s)
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
  );
};
