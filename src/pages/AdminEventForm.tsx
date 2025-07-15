import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useContentManager, Event } from '@/hooks/useContentManager';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { 
  Save,
  Eye,
  ArrowLeft,
  Upload,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const AdminEventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { adminSession, isLoading: authLoading } = useAdminAuth();
  const { createEvent, updateEvent, uploadImage, generateSlug } = useContentManager();

  const isEdit = !!id;
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    event_date: '',
    location: '',
    image_url: '',
    status: 'draft' as 'draft' | 'published'
  });

  const [previewSlug, setPreviewSlug] = useState('');

  useEffect(() => {
    if (formData.title) {
      setPreviewSlug(generateSlug(formData.title));
    }
  }, [formData.title, generateSlug]);

  // Load event data for editing
  useEffect(() => {
    if (isEdit && id && adminSession) {
      loadEvent(id);
    }
  }, [id, adminSession]);

  const loadEvent = async (eventId: string) => {
    try {
      setLoading(true);
      // For now, we'll need to fetch manually since useContentManager doesn't have a single fetch
      // This would be improved with a getEvent method
      console.log('Loading event:', eventId);
    } catch (error) {
      console.error('Error loading event:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger l'événement",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setImageUploading(true);
      const imageUrl = await uploadImage(file, 'events');
      setFormData(prev => ({
        ...prev,
        image_url: imageUrl
      }));
      toast({
        title: "Succès",
        description: "Image téléchargée avec succès",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors du téléchargement de l'image",
        variant: "destructive"
      });
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!formData.title || !formData.description || !formData.event_date || !formData.location) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const eventData = {
        ...formData,
        status,
        created_by: adminSession?.id
      };

      if (isEdit && id) {
        await updateEvent(id, eventData);
        toast({
          title: "Succès",
          description: "Événement mis à jour avec succès",
        });
      } else {
        await createEvent(eventData);
        toast({
          title: "Succès",
          description: "Événement créé avec succès",
        });
      }

      navigate('/admin/events');
    } catch (error) {
      console.error('Error saving event:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la sauvegarde",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
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
            <div>
              <h1 className="text-2xl font-display font-bold text-casa-blue">
                {isEdit ? 'Modifier l\'événement' : 'Nouvel événement'}
              </h1>
              <p className="text-gray-600">
                {previewSlug && `URL: /evenements/${previewSlug}`}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/admin/events')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSubmit('draft')}
                disabled={loading}
              >
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
              <Button
                onClick={() => handleSubmit('published')}
                disabled={loading}
                className="bg-casa-blue hover:bg-blue-700"
              >
                <Eye className="h-4 w-4 mr-2" />
                Publier
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations principales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Titre de l'événement"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description courte *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Description qui apparaîtra dans la liste des événements"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="event_date">Date et heure *</Label>
                    <Input
                      id="event_date"
                      type="datetime-local"
                      value={formData.event_date}
                      onChange={(e) => handleInputChange('event_date', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Lieu *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Lieu de l'événement"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contenu détaillé</CardTitle>
              </CardHeader>
              <CardContent>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => handleInputChange('content', value)}
                  placeholder="Décrivez l'événement en détail..."
                  className="min-h-[300px]"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Image de couverture</CardTitle>
              </CardHeader>
              <CardContent>
                {formData.image_url ? (
                  <div className="relative">
                    <img
                      src={formData.image_url}
                      alt="Aperçu"
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Glissez une image ou cliquez pour télécharger
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={imageUploading}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      disabled={imageUploading}
                    >
                      <label htmlFor="image-upload" className="cursor-pointer">
                        {imageUploading ? 'Téléchargement...' : 'Choisir une image'}
                      </label>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Publication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Statut</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: 'draft' | 'published') => 
                        setFormData(prev => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Brouillon</SelectItem>
                        <SelectItem value="published">Publié</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {previewSlug && (
                    <div>
                      <Label>URL générée</Label>
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        /evenements/{previewSlug}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminEventForm;