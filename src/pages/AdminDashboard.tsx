
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { 
  Images, 
  Upload, 
  BarChart3, 
  Settings, 
  LogOut,
  Eye,
  Clock,
  FolderOpen
} from 'lucide-react';

const AdminDashboard = () => {
  const { adminSession, isLoading, logout } = useAdminAuth();
  const [stats, setStats] = useState({
    totalPhotos: 0,
    carouselPhotos: 0,
    recentUploads: 0
  });

  useEffect(() => {
    if (adminSession) {
      fetchStats();
    }
  }, [adminSession]);

  const fetchStats = async () => {
    try {
      const { data: allPhotos } = await supabase
        .from('school_photos')
        .select('*', { count: 'exact' });

      const { data: carouselPhotos } = await supabase
        .from('school_photos')
        .select('*', { count: 'exact' })
        .eq('category', 'carousel');

      const { data: recentPhotos } = await supabase
        .from('school_photos')
        .select('*', { count: 'exact' })
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      setStats({
        totalPhotos: allPhotos?.length || 0,
        carouselPhotos: carouselPhotos?.length || 0,
        recentUploads: recentPhotos?.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
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
            <div>
              <h1 className="text-2xl font-display font-bold text-casa-blue">
                Administration Casa Hills
              </h1>
              <p className="text-gray-600">
                Bienvenue, {adminSession?.full_name}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" target="_blank">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Voir le site
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Photos totales</CardTitle>
              <Images className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPhotos}</div>
              <p className="text-xs text-muted-foreground">
                Images dans la galerie
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Carousel</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.carouselPhotos}/3</div>
              <p className="text-xs text-muted-foreground">
                Images du carousel
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cette semaine</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.recentUploads}</div>
              <p className="text-xs text-muted-foreground">
                Nouveaux ajouts
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/admin/photos">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Images className="h-5 w-5 text-casa-blue" />
                  Gérer les photos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Organiser, modifier et gérer toutes les photos de l'école
                </p>
                <Button className="w-full bg-casa-blue hover:bg-blue-700">
                  Ouvrir la galerie
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/admin/photos/upload">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-casa-green" />
                  Ajouter des photos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Importer de nouvelles photos et les organiser par catégorie
                </p>
                <Button className="w-full bg-casa-green hover:bg-green-700">
                  Nouveau téléchargement
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/admin/carousel">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-casa-red" />
                  Carousel principal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Gérer les 3 images du carousel de la page d'accueil
                </p>
                <Button className="w-full bg-casa-red hover:bg-red-700">
                  Modifier le carousel
                </Button>
              </CardContent>
            </Link>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
