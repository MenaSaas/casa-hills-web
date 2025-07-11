
import { useState, useEffect } from 'react';

interface CSRFToken {
  token: string;
  expiresAt: number;
}

// Génération d'un token CSRF
const generateCSRFToken = (): CSRFToken => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  const expiresAt = Date.now() + (30 * 60 * 1000); // 30 minutes
  
  return { token, expiresAt };
};

export const useCSRFToken = () => {
  const [csrfToken, setCSRFToken] = useState<string>('');

  useEffect(() => {
    const generateNewToken = () => {
      const tokenData = generateCSRFToken();
      setCSRFToken(tokenData.token);
      sessionStorage.setItem('csrf_token', JSON.stringify(tokenData));
    };

    // Vérifier si un token existe et est valide
    const existingToken = sessionStorage.getItem('csrf_token');
    if (existingToken) {
      try {
        const tokenData: CSRFToken = JSON.parse(existingToken);
        if (tokenData.expiresAt > Date.now()) {
          setCSRFToken(tokenData.token);
        } else {
          generateNewToken();
        }
      } catch {
        generateNewToken();
      }
    } else {
      generateNewToken();
    }

    // Renouveler le token toutes les 25 minutes
    const interval = setInterval(generateNewToken, 25 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return csrfToken;
};

interface CSRFProtectedFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent, csrfToken: string) => void;
  className?: string;
}

export const CSRFProtectedForm: React.FC<CSRFProtectedFormProps> = ({
  children,
  onSubmit,
  className
}) => {
  const csrfToken = useCSRFToken();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!csrfToken) {
      console.error('Token CSRF manquant');
      return;
    }
    onSubmit(e, csrfToken);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input type="hidden" name="csrf_token" value={csrfToken} />
      {children}
    </form>
  );
};
