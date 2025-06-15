import { useState, useCallback } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  X,
  Image as ImageIcon,
  CheckCircle
} from 'lucide-react';

interface UploadFile {
  file: File;
  preview: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
}

const AdminPhotoUpload = () => {
  const { adminSession, isLoading } = useAdminAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    { 
      value: 'carousel', 
      label: 'Carousel principal (Page d\'accueil)', 
      description: 'Images principales du carousel de la page d\'accueil (max 5 recommandées)',
      maxFiles: 5 
    },
    { 
      value: 'school-levels', 
      label: 'Cycles scolaires (Page d\'accueil)', 
      description: 'Images représentant chaque cycle scolaire sur la page d\'accueil'
    },
    { 
      value: 'news', 
      label: 'Actualités et événements', 
      description: 'Photos pour la section actualités et événements de l\'école'
    },
    { 
      value: 'philosophy', 
      label: 'Philosophie - Activités pédagogiques', 
      description: 'Images d\'activités pédagogiques pour la page Philosophie'
    },
    { 
      value: 'campus', 
      label: 'Espaces du campus', 
      description: 'Photos des différents espaces extérieurs et intérieurs du campus'
    },
    { 
      value: 'facilities', 
      label: 'Installations et équipements', 
      description: 'Photos des installations spécialisées et équipements de l\'école'
    }
  ];

  const subcategories = {
    'school-levels': [
      'Maternelle',
      'Primaire', 
      'Collège',
      'Lycée'
    ],
    'news': [
      'Événements scolaires',
      'Concours et prix',
      'Sorties pédagogiques',
      'Fêtes et célébrations',
      'Projets étudiants'
    ],
    'philosophy': [
      'Sciences expérimentales',
      'Arts et créativité',
      'Sport et activités physiques',
      'Langues et cultures',
      'Projets collaboratifs'
    ],
    'campus': [
      'Cours de récréation',
      'Jardins et espaces verts',
      'Terrains de sport',
      'Entrée principale',
      'Espaces de détente'
    ],
    'facilities': [
      'Bibliothèque',
      'Laboratoires de sciences',
      'Salles informatique',
      'Cantine et restauration',
      'Gymnase et sport',
      'Salles de classe',
      'Auditorium'
    ]
  };

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
            uploaded_by: adminSession?.id
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
        {/* File Upload Zone */}
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
                    onChange={handleFileSelect}
                  />
                </Label>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, JPEG jusqu'à 10MB chacun
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Categories Guide */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Guide des catégories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => (
                <div key={category.value} className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-casa-blue mb-2">{category.label}</h4>
                  <p className="text-sm text-gray-600">{category.description}</p>
                  {category.maxFiles && (
                    <p className="text-xs text-casa-red mt-2">Max recommandé: {category.maxFiles} photos</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Files */}
        {uploadFiles.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                Photos sélectionnées ({uploadFiles.length})
              </h2>
              <Button
                onClick={handleUpload}
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
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative">
                        <img
                          src={uploadFile.preview}
                          alt={uploadFile.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <Label htmlFor={`title-${index}`}>Titre</Label>
                          <Input
                            id={`title-${index}`}
                            value={uploadFile.title}
                            onChange={(e) => updateFile(index, 'title', e.target.value)}
                            placeholder="Titre de la photo"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`description-${index}`}>Description</Label>
                          <Textarea
                            id={`description-${index}`}
                            value={uploadFile.description}
                            onChange={(e) => updateFile(index, 'description', e.target.value)}
                            placeholder="Description optionnelle"
                            rows={2}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`category-${index}`}>Section du site</Label>
                            <Select
                              value={uploadFile.category}
                              onValueChange={(value) => {
                                updateFile(index, 'category', value);
                                updateFile(index, 'subcategory', ''); // Reset subcategory
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map(category => (
                                  <SelectItem key={category.value} value={category.value}>
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor={`subcategory-${index}`}>Sous-catégorie</Label>
                            <Select
                              value={uploadFile.subcategory}
                              onValueChange={(value) => updateFile(index, 'subcategory', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Optionnel" />
                              </SelectTrigger>
                              <SelectContent>
                                {subcategories[uploadFile.category as keyof typeof subcategories]?.map(sub => (
                                  <SelectItem key={sub} value={sub}>
                                    {sub}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPhotoUpload;
