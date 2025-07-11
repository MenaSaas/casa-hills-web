
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
  FolderOpen,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { initializeSecurityMonitoring } from '@/utils/securityMonitoring';

const AdminDashboard = () => {
  const { adminSession, isLoading, logout, isValidating, renewSession } = useAdminAuth();
  const [stats, setStats] = useState({
    totalPhotos: 0,
    carouselPhotos: 0,
    recentUploads: 0
  });
  const [sessionStatus, setSessionStatus] = useState<'active' | 'expiring' | 'invalid'>('active');

  useEffect(() => {
    if (adminSession) {
      fetchStats();
    }
  }, [adminSession]);

  // Initialiser la surveillance de sécurité
  useEffect(() => {
    initializeSecurityMonitoring();
  }, []);

  // Surveiller l'expiration de session
  useEffect(() => {
    if (!adminSession) return;

    const checkSessionExpiration = () => {
      const expiresAt = new Date(adminSession.expiresAt);
      const now = new Date();
      const timeUntilExpiration = expiresAt.getTime() - now.getTime();
      
      if (timeUntilExpiration <= 0) {
        setSessionStatus('invalid');
        logout();
      } else if (timeUntilExpiration <= 30 * 60 * 1000) { // 30 minutes
        setSessionStatus('expiring');
      } else {
        setSessionStatus('active');
      }
    };

    checkSessionExpiration();
    const interval = setInterval(checkSessionExpiration, 60 * 1000); // Vérifier chaque minute

    return () => clearInterval(interval);
  }, [adminSession, logout]);

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

  const handleRenewSession = async () => {
    const success = await renewSession();
    if (success) {
      setSessionStatus('active');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-casa-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Vérification sécurisée...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec indicateur de sécurité */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-display font-bold text-casa-blue">
                  Administration Casa Hills
                </h1>
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-gray-600">
                Bienvenue, {adminSession?.full_name}
              </p>
              {sessionStatus === 'expiring' && (
                <div className="flex items-center gap-2 mt-2 p-2 bg-orange-50 border border-orange-200 rounded-md">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-orange-700">
                    Session expire bientôt
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleRenewSession}
                    className="ml-2"
                  >
                    Renouveler
                  </Button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              {isValidating && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-casa-blue"></div>
                  Validation...
                </div>
              )}
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
                Déconnexion sécurisée
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards avec indicateur de sécurité */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sécurité</CardTitle>
              <Shield className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Actif</div>
              <p className="text-xs text-muted-foreground">
                Protection active
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
