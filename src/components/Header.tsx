
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Maternelle', href: '/maternelle' },
    { name: 'Primaire', href: '/primaire' },
    { name: 'Collège', href: '/college' },
    { name: 'Lycée', href: '/lycee' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Notre Philosophie', href: '/philosophie' },
    { name: 'Actualités', href: '/actualites' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-casa-blue text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+212 522 XX XX XX</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@casahills.ma</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Horaires : Lun-Ven 8h00-17h00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-casa-blue to-casa-red rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">CH</span>
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-900">Casa Hills</h1>
              <p className="text-sm text-gray-600">Une école, mille possibilités</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-casa-blue ${
                  location.pathname === item.href
                    ? 'text-casa-blue border-b-2 border-casa-blue pb-1'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Brochure
            </Button>
            <Button className="bg-casa-red hover:bg-red-700" size="sm">
              Inscription
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block py-2 text-sm font-medium ${
                  location.pathname === item.href
                    ? 'text-casa-blue'
                    : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                Brochure
              </Button>
              <Button className="bg-casa-red hover:bg-red-700 w-full" size="sm">
                Inscription
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
