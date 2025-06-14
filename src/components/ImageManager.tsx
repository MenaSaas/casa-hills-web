
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUploader from './ImageUploader';
import ImageGallery from './ImageGallery';

const ImageManager = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>('');

  const folders = [
    { id: '', name: 'Racine', description: 'Images générales' },
    { id: 'logos', name: 'Logos', description: 'Logos et éléments de marque' },
    { id: 'gallery', name: 'Galerie', description: 'Photos de l\'école et activités' },
    { id: 'news', name: 'Actualités', description: 'Images pour les articles de news' },
    { id: 'events', name: 'Événements', description: 'Photos d\'événements' },
    { id: 'staff', name: 'Personnel', description: 'Photos du personnel enseignant' },
    { id: 'facilities', name: 'Installations', description: 'Photos des installations' }
  ];

  const handleUploadSuccess = (url: string) => {
    console.log('Image uploadée:', url);
    // Rafraîchir la galerie sera fait automatiquement par le hook
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestionnaire d'Images Casa Hills</CardTitle>
          <CardDescription>
            Uploadez et gérez les images de votre site web depuis le stockage Supabase
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={selectedFolder} onValueChange={setSelectedFolder}>
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          {folders.map((folder) => (
            <TabsTrigger key={folder.id} value={folder.id} className="text-xs">
              {folder.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {folders.map((folder) => (
          <TabsContent key={folder.id} value={folder.id} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dossier: {folder.name}</CardTitle>
                <CardDescription>{folder.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUploader
                  folder={folder.id || undefined}
                  onUploadSuccess={handleUploadSuccess}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Images dans ce dossier</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageGallery 
                  folder={folder.id || undefined}
                  key={`gallery-${folder.id}`}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ImageManager;
