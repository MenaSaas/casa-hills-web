
import { ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FileUploadZoneProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadZone = ({ onFileSelect }: FileUploadZoneProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Sélectionner des fichiers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="mb-4">
            <Label htmlFor="file-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Cliquez pour sélectionner des photos ou glissez-déposez
              </span>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={onFileSelect}
              />
            </Label>
          </div>
          <p className="text-xs text-gray-500">
            PNG, JPG, JPEG jusqu'à 10MB chacun
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
