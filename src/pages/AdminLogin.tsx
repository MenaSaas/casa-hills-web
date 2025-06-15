
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Lock, School } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Utiliser la fonction sécurisée pour vérifier les identifiants
      const { data, error } = await supabase.rpc('verify_admin_password', {
        input_email: email,
        input_password: password
      });

      if (error) {
        console.error('Erreur de vérification:', error);
        toast({
          title: "Erreur de connexion",
          description: "Une erreur est survenue lors de la vérification",
          variant: "destructive",
        });
        return;
      }

      if (!data || data.length === 0) {
        toast({
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect",
          variant: "destructive",
        });
        return;
      }

      const adminData = data[0];

      // Stocker la session admin dans localStorage
      localStorage.setItem('admin_session', JSON.stringify({
        id: adminData.admin_id,
        email: adminData.admin_email,
        full_name: adminData.admin_full_name,
        loginTime: new Date().toISOString()
      }));

      // Mettre à jour la dernière connexion
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', adminData.admin_id);

      toast({
        title: "Connexion réussie",
        description: `Bienvenue ${adminData.admin_full_name}`,
      });

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-casa-blue p-3 rounded-full">
              <School className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-display font-bold text-casa-blue">
            Administration Casa Hills
          </h2>
          <p className="mt-2 text-gray-600">
            Gestion des photos et contenus
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Connexion Administrateur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="casahills@admin.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-casa-blue hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Accès réservé aux administrateurs autorisés</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
