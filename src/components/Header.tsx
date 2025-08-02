
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Notre École', href: '/philosophie' },
    { name: 'Actualités', href: '/actualites' },
    { name: 'Blog', href: '/blog' },
    { name: 'Événements', href: '/evenements' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Contact', href: '/contact' }
  ];

  const cyclesNavigation = [
    { name: 'Maternelle', href: '/maternelle', age: '3-6 ans', description: 'Éveil et développement' },
    { name: 'Primaire', href: '/primaire', age: '6-11 ans', description: 'Fondamentaux solides' },
    { name: 'Collège', href: '/college', age: '11-15 ans', description: 'Approfondissement' },
    { name: 'Lycée', href: '/lycee', age: '15-18 ans', description: 'Excellence et préparation' }
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white shadow-md transition-all duration-300 ${isScrolled ? 'py-1' : ''}`}>
      {/* Top bar */}
      <div className={`bg-casa-blue text-white transition-all duration-300 ${isScrolled ? 'py-1 opacity-0 h-0 overflow-hidden' : 'py-2'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>05 22 75 93 04 / +212 6 63 51 44 32</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>G.scasahills@gmail.com</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span className="mr-4">Horaires : Lun-Ven 8h00-17h00</span>
              <a href="https://web.facebook.com/profile.php?id=100078730485495" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-4 w-4 hover:text-blue-200 cursor-pointer" />
              </a>
              <a href="https://www.instagram.com/ecolecasahills/" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4 hover:text-blue-200 cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/303c3f10-6f18-4cac-9f1c-0a591dc1f599.png" 
              alt="Casa Hills Logo" 
              className={`object-contain transition-all duration-300 ${isScrolled ? 'w-12 h-12' : 'w-16 h-16'}`}
            />
            <div>
              <h1 className={`font-display font-bold text-gray-900 transition-all duration-300 ${isScrolled ? 'text-xl' : 'text-2xl'}`}>Casa Hills</h1>
              <p className={`text-gray-600 transition-all duration-300 ${isScrolled ? 'text-xs opacity-0 h-0 overflow-hidden' : 'text-sm'}`}>Une école, mille possibilités</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {mainNavigation.slice(0, 2).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors hover:text-casa-blue rounded-md ${
                  location.pathname === item.href
                    ? 'text-casa-blue bg-blue-50'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Cycles dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-casa-blue">
                    Cycles
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-80 p-4">
                      <div className="grid grid-cols-1 gap-3">
                        {cyclesNavigation.map((cycle) => (
                          <Link
                            key={cycle.name}
                            to={cycle.href}
                            className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-semibold text-gray-900">{cycle.name}</div>
                                <div className="text-sm text-gray-600">{cycle.description}</div>
                              </div>
                              <span className="text-xs bg-casa-blue text-white px-2 py-1 rounded">
                                {cycle.age}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {mainNavigation.slice(2).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors hover:text-casa-blue rounded-md ${
                  location.pathname === item.href
                    ? 'text-casa-blue bg-blue-50'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
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
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {mainNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block py-3 px-4 text-sm font-medium rounded-md ${
                  location.pathname === item.href
                    ? 'text-casa-blue bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="py-2">
              <div className="text-sm font-medium text-gray-500 px-4 py-2">Cycles Scolaires</div>
              {cyclesNavigation.map((cycle) => (
                <Link
                  key={cycle.name}
                  to={cycle.href}
                  className={`block py-2 px-8 text-sm ${
                    location.pathname === cycle.href
                      ? 'text-casa-blue'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cycle.name} ({cycle.age})
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
