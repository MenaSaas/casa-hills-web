
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie, Settings, X } from 'lucide-react';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('casa-hills-cookies');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('casa-hills-cookies', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
    // Initialize Google Analytics
    initializeAnalytics();
  };

  const acceptNecessary = () => {
    localStorage.setItem('casa-hills-cookies', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  const initializeAnalytics = () => {
    // Google Analytics initialization code would go here
    console.log('Google Analytics initialized');
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-4xl mx-auto bg-white border shadow-2xl">
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Cookie className="h-8 w-8 text-casa-blue" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Gestion des cookies
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Nous utilisons des cookies pour améliorer votre expérience sur notre site, 
                analyser le trafic et personnaliser le contenu. En cliquant sur "Accepter tout", 
                vous consentez à l'utilisation de tous les cookies conformément à notre 
                <a href="/politique-cookies" className="text-casa-blue hover:underline ml-1">
                  politique de cookies
                </a>.
              </p>
              
              {showSettings && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Cookies nécessaires</span>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Toujours actifs</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cookies analytiques (Google Analytics)</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cookies marketing</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cookies de préférences</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={acceptAll}
                  className="bg-casa-blue hover:bg-blue-700 text-white"
                >
                  Accepter tout
                </Button>
                <Button 
                  onClick={acceptNecessary}
                  variant="outline"
                  className="border-gray-300"
                >
                  Nécessaires uniquement
                </Button>
                <Button 
                  onClick={() => setShowSettings(!showSettings)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-600"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </Button>
              </div>
            </div>
            
            <Button
              onClick={() => setShowBanner(false)}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieBanner;
