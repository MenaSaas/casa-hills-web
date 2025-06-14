
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Copy, CheckCircle, AlertTriangle } from 'lucide-react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { toast } from '@/hooks/use-toast';

const ImageMigrationHelper = () => {
  const { uploadImage, isUploading } = useImageUpload();
  const [migrationResults, setMigrationResults] = useState<{[key: string]: string}>({});

  // Images actuelles identifiées dans le code
  const existingImages = [
    {
      name: 'Logo Casa Hills',
      path: '/lovable-uploads/303c3f10-6f18-4cac-9f1c-0a591dc1f599.png',
      suggestedFolder: 'logos',
      usedIn: ['Header.tsx', 'Footer.tsx']
    },
    {
      name: 'Image Maternelle',
      path: '/lovable-uploads/93b73cb2-8d92-41b9-9e6b-5d9894170e5a.png',
      suggestedFolder: 'gallery',
      usedIn: ['Index.tsx']
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "URL copiée",
      description: "L'URL a été copiée dans le presse-papiers.",
    });
  };

  const handleFileUpload = async (file: File, folder: string, imageName: string) => {
    const url = await uploadImage(file, folder);
    if (url) {
      setMigrationResults(prev => ({
        ...prev,
        [imageName]: url
      }));
      toast({
        title: "Migration réussie",
        description: `${imageName} a été migrée vers Supabase.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Assistant de Migration des Images</span>
          </CardTitle>
          <CardDescription>
            Cet outil vous aide à migrer les images existantes vers le stockage Supabase.
            Uploadez manuellement les images ci-dessous dans les dossiers suggérés.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {existingImages.map((image, index) => (
          <Card key={index} className="relative">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{image.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Chemin actuel :</strong> {image.path}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Dossier suggéré :</strong> {image.suggestedFolder}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Utilisée dans :</strong> {image.usedIn.join(', ')}
                  </p>

                  {migrationResults[image.name] ? (
                    <Alert className="mb-4">
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription className="flex items-center justify-between">
                        <span>Image migrée avec succès !</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(migrationResults[image.name])}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copier URL
                        </Button>
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert variant="destructive" className="mb-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Cette image doit être migrée manuellement. Utilisez le gestionnaire d'images ci-dessus.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="text-xs text-gray-500">
                    <strong>Instructions :</strong> Téléchargez l'image depuis {image.path}, 
                    puis uploadez-la dans le dossier "{image.suggestedFolder}" via le gestionnaire d'images.
                  </div>
                </div>

                <div className="ml-4">
                  <img 
                    src={image.path} 
                    alt={image.name}
                    className="w-20 h-20 object-cover rounded border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Étapes de migration</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Utilisez le gestionnaire d'images ci-dessus pour uploader chaque image dans le dossier suggéré</li>
            <li>Copiez les nouvelles URLs Supabase générées</li>
            <li>Mettez à jour les références dans le code (Header.tsx, Footer.tsx, Index.tsx)</li>
            <li>Testez que toutes les images s'affichent correctement</li>
            <li>Supprimez les anciens fichiers du dossier lovable-uploads si nécessaire</li>
          </ol>
        </CardContent>
      </Card>

      {Object.keys(migrationResults).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>URLs Supabase générées</CardTitle>
            <CardDescription>
              Copiez ces URLs pour mettre à jour vos références dans le code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(migrationResults).map(([name, url]) => (
                <div key={name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="font-medium">{name}:</span>
                  <div className="flex items-center space-x-2">
                    <code className="text-xs bg-white px-2 py-1 rounded">{url}</code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(url)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageMigrationHelper;
