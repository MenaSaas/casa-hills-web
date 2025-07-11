
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Lock, School, AlertTriangle } from 'lucide-react';
import { CSRFProtectedForm } from '@/components/security/CSRFProtection';
import { 
  sanitizeInput, 
  validateEmail, 
  loginRateLimiter,
  detectInjectionAttempt 
} from '@/utils/inputValidation';
import { 
  generateSessionToken, 
  encryptSessionData, 
  logSecurityEvent,
  cleanupAuthState 
} from '@/utils/adminSecurity';
import { securityMonitor } from '@/utils/securityMonitoring';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Vérification du rate limiting
  const checkRateLimit = (): boolean => {
    const clientId = 'admin_login'; // En production, utiliser une empreinte unique du client
    const isAllowed = loginRateLimiter.isAllowed(clientId);
    
    if (!isAllowed) {
      const remainingTime = loginRateLimiter.getRemainingTime(clientId);
      setIsBlocked(true);
      
      securityMonitor.logAlert({
        type: 'rate_limit_exceeded',
        severity: 'medium',
        message: 'Limite de tentatives de connexion dépassée',
        details: { remainingTime, attempts }
      });

      toast({
        title: "Trop de tentatives",
        description: `Veuillez attendre ${Math.ceil(remainingTime / 60000)} minutes avant de réessayer.`,
        variant: "destructive",
      });
      
      return false;
    }
    
    return true;
  };

  const handleLogin = async (e: React.FormEvent, csrfToken: string) => {
    e.preventDefault();
    
    // Vérifier le rate limiting
    if (!checkRateLimit()) {
      return;
    }

    // Nettoyer d'abord l'état existant
    cleanupAuthState();
    
    setIsLoading(true);

    try {
      // Sanitiser et valider les inputs
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedPassword = sanitizeInput(password);

      // Détecter les tentatives d'injection
      if (detectInjectionAttempt(sanitizedEmail) || detectInjectionAttempt(sanitizedPassword)) {
        await securityMonitor.logAlert({
          type: 'injection_attempt',
          severity: 'high',
          message: 'Tentative d\'injection détectée dans le formulaire de connexion',
          details: { email: sanitizedEmail, hasPassword: !!sanitizedPassword }
        });

        toast({
          title: "Tentative d'attaque détectée",
          description: "Cette tentative a été enregistrée. Contactez l'administrateur si c'est une erreur.",
          variant: "destructive",
        });
        return;
      }

      // Valider l'email
      if (!validateEmail(sanitizedEmail)) {
        toast({
          title: "Email invalide",
          description: "Veuillez saisir une adresse email valide",
          variant: "destructive",
        });
        return;
      }

      // Vérifier les champs obligatoires
      if (!sanitizedEmail || !sanitizedPassword) {
        toast({
          title: "Champs manquants",
          description: "Veuillez remplir tous les champs",
          variant: "destructive",
        });
        return;
      }

      // Enregistrer la tentative de connexion
      await logSecurityEvent({
        type: 'login_attempt',
        details: `Tentative de connexion pour ${sanitizedEmail}`,
        user_agent: navigator.userAgent
      });

      // Utiliser la fonction sécurisée pour vérifier les identifiants
      const { data, error } = await supabase.rpc('verify_admin_password', {
        input_email: sanitizedEmail,
        input_password: sanitizedPassword
      });

      if (error) {
        console.error('Erreur de vérification:', error);
        
        await securityMonitor.logAlert({
          type: 'failed_login',
          severity: 'medium',
          message: 'Erreur lors de la vérification des identifiants',
          details: { email: sanitizedEmail, error: error.message }
        });

        toast({
          title: "Erreur de connexion",
          description: "Une erreur technique est survenue",
          variant: "destructive",
        });
        return;
      }

      if (!data || data.length === 0) {
        setAttempts(prev => prev + 1);
        
        await securityMonitor.logAlert({
          type: 'failed_login',
          severity: 'medium',
          message: 'Tentative de connexion avec identifiants incorrects',
          details: { email: sanitizedEmail, attempts: attempts + 1 }
        });

        toast({
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect",
          variant: "destructive",
        });
        return;
      }

      const adminData = data[0];

      // Générer un token de session sécurisé
      const sessionToken = generateSessionToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 8); // 8 heures au lieu de 24

      // Créer la session sécurisée
      const secureSession = {
        id: adminData.admin_id,
        email: adminData.admin_email,
        full_name: adminData.admin_full_name,
        loginTime: new Date().toISOString(),
        sessionToken,
        expiresAt: expiresAt.toISOString()
      };

      // Chiffrer et stocker la session
      const encryptedSession = encryptSessionData(secureSession);
      localStorage.setItem('secure_admin_session', encryptedSession);

      // Mettre à jour la dernière connexion
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', adminData.admin_id);

      // Enregistrer la connexion réussie
      await logSecurityEvent({
        type: 'login_attempt',
        details: `Connexion réussie pour ${adminData.admin_full_name}`,
        user_agent: navigator.userAgent
      });

      toast({
        title: "Connexion réussie",
        description: `Bienvenue ${adminData.admin_full_name}`,
      });

      // Redirection sécurisée
      navigate('/admin/dashboard', { replace: true });
      
    } catch (error) {
      console.error('Erreur de connexion:', error);
      
      await securityMonitor.logAlert({
        type: 'suspicious_activity',
        severity: 'high',
        message: 'Erreur inattendue lors de la connexion',
        details: { error: error instanceof Error ? error.message : 'Unknown error' }
      });

      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue",
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
            Connexion sécurisée
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Authentification Sécurisée
            </CardTitle>
            {isBlocked && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-700">
                  Compte temporairement bloqué pour sécurité
                </span>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <CSRFProtectedForm onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email administrateur</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@casahills.ma"
                  required
                  disabled={isLoading || isBlocked}
                  maxLength={254}
                  autoComplete="username"
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
                  disabled={isLoading || isBlocked}
                  maxLength={128}
                  autoComplete="current-password"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-casa-blue hover:bg-blue-700"
                disabled={isLoading || isBlocked}
              >
                {isLoading ? 'Vérification sécurisée...' : 'Connexion sécurisée'}
              </Button>
            </CSRFProtectedForm>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>🔒 Connexion protégée par chiffrement et surveillance</p>
          <p>Toutes les tentatives sont enregistrées</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
