import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye,
  ArrowLeft,
  Calendar,
  Clock,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';
import { fr } from 'date-fns/locale';

interface VisitStats {
  totalVisits: number;
  todayVisits: number;
  weekVisits: number;
  monthVisits: number;
  topPages: Array<{ page_path: string; count: number }>;
  visitsByDay: Array<{ date: string; count: number }>;
}

const AdminAnalytics = () => {
  const { adminSession, isLoading } = useAdminAuth();
  const [stats, setStats] = useState<VisitStats>({
    totalVisits: 0,
    todayVisits: 0,
    weekVisits: 0,
    monthVisits: 0,
    topPages: [],
    visitsByDay: []
  });
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (adminSession) {
      fetchAnalytics();
    }
  }, [adminSession]);

  const fetchAnalytics = async () => {
    try {
      setLoadingData(true);
      
      const now = new Date();
      const startOfToday = startOfDay(now);
      const startOfWeek = startOfDay(subDays(now, 7));
      const startOfMonth = startOfDay(subDays(now, 30));

      // Total visits
      const { count: totalVisits } = await supabase
        .from('visits')
        .select('*', { count: 'exact', head: true });

      // Today's visits
      const { count: todayVisits } = await supabase
        .from('visits')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfToday.toISOString());

      // Week visits
      const { count: weekVisits } = await supabase
        .from('visits')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfWeek.toISOString());

      // Month visits
      const { count: monthVisits } = await supabase
        .from('visits')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfMonth.toISOString());

      // Top pages - using raw query for aggregation
      const { data: topPagesData } = await supabase
        .from('visits')
        .select('page_path')
        .gte('created_at', startOfMonth.toISOString());

      // Process top pages data
      const pageCount: { [key: string]: number } = {};
      topPagesData?.forEach(visit => {
        pageCount[visit.page_path] = (pageCount[visit.page_path] || 0) + 1;
      });

      const topPages = Object.entries(pageCount)
        .map(([page_path, count]) => ({ page_path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Visits by day for the last 7 days
      const visitsByDay = [];
      for (let i = 6; i >= 0; i--) {
        const date = subDays(now, i);
        const startDay = startOfDay(date);
        const endDay = endOfDay(date);
        
        const { count } = await supabase
          .from('visits')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', startDay.toISOString())
          .lte('created_at', endDay.toISOString());

        visitsByDay.push({
          date: format(date, 'dd/MM', { locale: fr }),
          count: count || 0
        });
      }

      setStats({
        totalVisits: totalVisits || 0,
        todayVisits: todayVisits || 0,
        weekVisits: weekVisits || 0,
        monthVisits: monthVisits || 0,
        topPages,
        visitsByDay
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const getPageName = (path: string) => {
    const pageNames: { [key: string]: string } = {
      '/': 'Accueil',
      '/philosophie': 'Notre École',
      '/maternelle': 'Maternelle',
      '/primaire': 'Primaire',
      '/college': 'Collège',
      '/lycee': 'Lycée',
      '/actualites': 'Actualités',
      '/blog': 'Blog',
      '/evenements': 'Événements',
      '/admissions': 'Admissions',
      '/contact': 'Contact',
      '/mentions-legales': 'Mentions Légales',
      '/politique-confidentialite': 'Politique de Confidentialité',
      '/politique-cookies': 'Politique des Cookies'
    };
    return pageNames[path] || path;
  };

  if (isLoading || loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-casa-blue mx-auto" />
          <p className="mt-4 text-gray-600">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                  Statistiques de Visite
                </h1>
                <p className="text-gray-600">
                  Analytics et données de fréquentation
                </p>
              </div>
            </div>
            <Link to="/" target="_blank">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Voir le site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visites totales</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVisits}</div>
              <p className="text-xs text-muted-foreground">
                Depuis le lancement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aujourd'hui</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayVisits}</div>
              <p className="text-xs text-muted-foreground">
                Visites du jour
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cette semaine</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.weekVisits}</div>
              <p className="text-xs text-muted-foreground">
                7 derniers jours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ce mois</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.monthVisits}</div>
              <p className="text-xs text-muted-foreground">
                30 derniers jours
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Visits by Day Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Visites des 7 derniers jours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.visitsByDay.map((day, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-16 text-sm font-medium text-gray-600">
                      {day.date}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                      <div 
                        className="bg-casa-blue h-4 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${Math.max((day.count / Math.max(...stats.visitsByDay.map(d => d.count))) * 100, 5)}%` 
                        }}
                      />
                    </div>
                    <div className="w-12 text-sm font-bold text-casa-blue text-right">
                      {day.count}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Pages les plus visitées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.topPages.slice(0, 8).map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-casa-blue text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium">
                        {getPageName(page.page_path)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {page.page_path}
                      </span>
                    </div>
                    <div className="bg-blue-100 text-casa-blue px-2 py-1 rounded-full text-xs font-bold">
                      {page.count}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminAnalytics;