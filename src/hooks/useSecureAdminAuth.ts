
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  cleanupAuthState, 
  validateAdminSession, 
  revokeAdminSession,
  logSecurityEvent,
  encryptSessionData,
  decryptSessionData
} from '@/utils/adminSecurity';

interface SecureAdminSession {
  id: string;
  email: string;
  full_name: string;
  loginTime: string;
  sessionToken: string;
  expiresAt: string;
}

export const useSecureAdminAuth = () => {
  const [adminSession, setAdminSession] = useState<SecureAdminSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidating, setIsValidating] = useState(false);
  const navigate = useNavigate();

  // Validation de session côté serveur
  const validateSession = async (sessionToken: string): Promise<boolean> => {
    setIsValidating(true);
    try {
      const isValid = await validateAdminSession(sessionToken);
      if (!isValid) {
        await logSecurityEvent({
          type: 'session_expired',
          details: 'Session invalide détectée'
        });
        cleanupAuthState();
        navigate('/admin/login');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Erreur de validation:', error);
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  useEffect(() => {
    const checkAdminSession = async () => {
      try {
        const encryptedSession = localStorage.getItem('secure_admin_session');
        if (encryptedSession) {
          const session = decryptSessionData(encryptedSession);
          
          if (session && session.sessionToken) {
            // Vérifier l'expiration locale
            const expiresAt = new Date(session.expiresAt);
            const now = new Date();
            
            if (now >= expiresAt) {
              await logSecurityEvent({
                type: 'session_expired',
                details: 'Session expirée (expiration locale)'
              });
              cleanupAuthState();
              navigate('/admin/login');
              return;
            }
            
            // Validation côté serveur
            const isValid = await validateSession(session.sessionToken);
            if (isValid) {
              setAdminSession(session);
            }
          } else {
            navigate('/admin/login');
          }
        } else {
          navigate('/admin/login');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de session:', error);
        await logSecurityEvent({
          type: 'suspicious_activity',
          details: 'Erreur lors de la vérification de session'
        });
        cleanupAuthState();
        navigate('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminSession();
  }, [navigate]);

  // Déconnexion sécurisée
  const secureLogout = async () => {
    try {
      if (adminSession?.sessionToken) {
        await revokeAdminSession(adminSession.sessionToken);
      }
      
      await logSecurityEvent({
        type: 'login_attempt',
        details: 'Déconnexion utilisateur'
      });
      
      cleanupAuthState();
      setAdminSession(null);
      navigate('/admin/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // Forcer la déconnexion même en cas d'erreur
      cleanupAuthState();
      setAdminSession(null);
      navigate('/admin/login');
    }
  };

  // Renouvellement de session
  const renewSession = async (): Promise<boolean> => {
    if (!adminSession?.sessionToken) return false;
    
    try {
      const isValid = await validateSession(adminSession.sessionToken);
      if (isValid) {
        // Mettre à jour l'heure d'expiration
        const newExpiresAt = new Date();
        newExpiresAt.setHours(newExpiresAt.getHours() + 8); // 8 heures au lieu de 24
        
        const updatedSession = {
          ...adminSession,
          expiresAt: newExpiresAt.toISOString()
        };
        
        const encryptedSession = encryptSessionData(updatedSession);
        localStorage.setItem('secure_admin_session', encryptedSession);
        setAdminSession(updatedSession);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur lors du renouvellement:', error);
      return false;
    }
  };

  return { 
    adminSession, 
    isLoading, 
    isValidating,
    logout: secureLogout,
    renewSession,
    validateSession: () => adminSession?.sessionToken ? validateSession(adminSession.sessionToken) : Promise.resolve(false)
  };
};
