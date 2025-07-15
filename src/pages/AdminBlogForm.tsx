import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useContentManager, BlogPost } from '@/hooks/useContentManager';
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
import { useToast } from '@/hooks/use-toast';

const AdminBlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { adminSession, isLoading: authLoading } = useAdminAuth();
  const { createBlogPost, updateBlogPost, uploadImage, generateSlug } = useContentManager();

  const isEdit = !!id;
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: adminSession?.full_name || '',
    image_url: '',
    status: 'draft' as 'draft' | 'published'
  });

  const [previewSlug, setPreviewSlug] = useState('');

  useEffect(() => {
    if (formData.title) {
      setPreviewSlug(generateSlug(formData.title));
    }
  }, [formData.title, generateSlug]);

  useEffect(() => {
    if (adminSession?.full_name && !formData.author) {
      setFormData(prev => ({
        ...prev,
        author: adminSession.full_name
      }));
    }
  }, [adminSession, formData.author]);

  // Generate excerpt from content
  useEffect(() => {
    if (formData.content && !formData.excerpt) {
      const textContent = formData.content.replace(/<[^>]*>/g, '');
      const excerpt = textContent.substring(0, 150) + (textContent.length > 150 ? '...' : '');
      setFormData(prev => ({
        ...prev,
        excerpt
      }));
    }
  }, [formData.content, formData.excerpt]);

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
      const imageUrl = await uploadImage(file, 'blog');
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
    if (!formData.title || !formData.content || !formData.author) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const postData = {
        ...formData,
        status,
        created_by: adminSession?.id
      };

      if (isEdit && id) {
        await updateBlogPost(id, postData);
        toast({
          title: "Succès",
          description: "Article mis à jour avec succès",
        });
      } else {
        await createBlogPost(postData);
        toast({
          title: "Succès",
          description: "Article créé avec succès",
        });
      }

      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving blog post:', error);
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
                {isEdit ? 'Modifier l\'article' : 'Nouvel article'}
              </h1>
              <p className="text-gray-600">
                {previewSlug && `URL: /blog/${previewSlug}`}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/admin/blog')}
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
                    placeholder="Titre de l'article"
                  />
                </div>

                <div>
                  <Label htmlFor="author">Auteur *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    placeholder="Nom de l'auteur"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Résumé</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    placeholder="Résumé qui apparaîtra dans la liste des articles (généré automatiquement si vide)"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contenu de l'article *</CardTitle>
              </CardHeader>
              <CardContent>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => handleInputChange('content', value)}
                  placeholder="Rédigez votre article ici..."
                  className="min-h-[400px]"
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
                        /blog/{previewSlug}
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

export default AdminBlogForm;