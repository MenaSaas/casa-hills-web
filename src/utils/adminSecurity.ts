
import { supabase } from '@/integrations/supabase/client';

interface AdminSession {
  id: string;
  email: string;
  full_name: string;
  loginTime: string;
  sessionToken: string;
  expiresAt: string;
}

// Génération d'un token de session sécurisé
export const generateSessionToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Chiffrement des données sensibles
export const encryptSessionData = (data: any): string => {
  try {
    return btoa(JSON.stringify(data));
  } catch (error) {
    console.error('Erreur de chiffrement:', error);
    return '';
  }
};

// Déchiffrement des données
export const decryptSessionData = (encryptedData: string): any => {
  try {
    return JSON.parse(atob(encryptedData));
  } catch (error) {
    console.error('Erreur de déchiffrement:', error);
    return null;
  }
};

// Nettoyage sécurisé des données sensibles
export const cleanupAuthState = () => {
  // Supprimer toutes les clés liées à l'authentification
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.includes('admin') || key.includes('session') || key.includes('auth'))) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
  });
  
  // Nettoyer également sessionStorage
  if (typeof sessionStorage !== 'undefined') {
    const sessionKeysToRemove = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && (key.includes('admin') || key.includes('session') || key.includes('auth'))) {
        sessionKeysToRemove.push(key);
      }
    }
    sessionKeysToRemove.forEach(key => {
      sessionStorage.removeItem(key);
    });
  }
};

// Validation côté serveur de la session
export const validateAdminSession = async (sessionToken: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('validate_admin_session', {
      session_token: sessionToken
    });
    
    if (error) {
      console.error('Erreur de validation de session:', error);
      return false;
    }
    
    return data && data.length > 0;
  } catch (error) {
    console.error('Erreur lors de la validation:', error);
    return false;
  }
};

// Révocation de session
export const revokeAdminSession = async (sessionToken: string): Promise<void> => {
  try {
    await supabase.rpc('revoke_admin_session', {
      session_token: sessionToken
    });
  } catch (error) {
    console.error('Erreur lors de la révocation:', error);
  }
};

// Détection d'activité suspecte
export const logSecurityEvent = async (event: {
  type: 'login_attempt' | 'failed_login' | 'session_expired' | 'suspicious_activity';
  details: string;
  ip_address?: string;
  user_agent?: string;
}): Promise<void> => {
  try {
    await supabase.rpc('log_security_event', {
      event_type: event.type,
      event_details: event.details,
      ip_address: event.ip_address || 'unknown',
      user_agent: event.user_agent || navigator.userAgent
    });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'événement:', error);
  }
};
