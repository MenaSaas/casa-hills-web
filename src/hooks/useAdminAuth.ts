
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminSession {
  id: string;
  email: string;
  full_name: string;
  loginTime: string;
}

export const useAdminAuth = () => {
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminSession = () => {
      try {
        const session = localStorage.getItem('admin_session');
        if (session) {
          const parsedSession = JSON.parse(session);
          
          // Check if session is not older than 24 hours
          const loginTime = new Date(parsedSession.loginTime);
          const now = new Date();
          const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
          
          if (hoursDiff < 24) {
            setAdminSession(parsedSession);
          } else {
            localStorage.removeItem('admin_session');
            navigate('/admin/login');
          }
        } else {
          navigate('/admin/login');
        }
      } catch (error) {
        console.error('Error checking admin session:', error);
        localStorage.removeItem('admin_session');
        navigate('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminSession();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('admin_session');
    setAdminSession(null);
    navigate('/admin/login');
  };

  return { adminSession, isLoading, logout };
};
