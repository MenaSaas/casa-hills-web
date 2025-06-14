
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageManager from '@/components/ImageManager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminImages = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
          
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-casa-blue" />
                <div>
                  <CardTitle className="text-2xl">Administration - Gestion des Images</CardTitle>
                  <CardDescription>
                    Interface d'administration pour gérer les images du site Casa Hills
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        <ImageManager />
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminImages;
