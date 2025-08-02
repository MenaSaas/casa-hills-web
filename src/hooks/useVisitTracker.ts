import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const useVisitTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        await supabase.from('visits').insert({
          page_path: location.pathname,
          user_agent: navigator.userAgent,
          ip_address: null // IP will be handled server-side if needed
        });
      } catch (error) {
        // Silently fail - we don't want to break the app for analytics
        console.debug('Visit tracking failed:', error);
      }
    };

    // Track visit after a small delay to avoid spam
    const timer = setTimeout(trackVisit, 1000);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
};