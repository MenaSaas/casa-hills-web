
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-casa-blue to-casa-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold">CH</span>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold">Casa Hills</h3>
                <p className="text-sm text-gray-300">Une école, mille possibilités</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              École privée d'excellence à Casablanca, offrant une éducation de qualité 
              dans un environnement multiculturel et bienveillant.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-white">Accueil</Link></li>
              <li><Link to="/philosophie" className="text-gray-300 hover:text-white">Notre Philosophie</Link></li>
              <li><Link to="/admissions" className="text-gray-300 hover:text-white">Admissions</Link></li>
              <li><Link to="/actualites" className="text-gray-300 hover:text-white">Actualités</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Cycles scolaires */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Cycles Scolaires</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/maternelle" className="text-gray-300 hover:text-white">Maternelle</Link></li>
              <li><Link to="/primaire" className="text-gray-300 hover:text-white">Primaire</Link></li>
              <li><Link to="/college" className="text-gray-300 hover:text-white">Collège</Link></li>
              <li><Link to="/lycee" className="text-gray-300 hover:text-white">Lycée</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 text-casa-blue" />
                <span className="text-gray-300">
                  Quartier Anfa, Boulevard de la Corniche<br />
                  Casablanca, Maroc
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-casa-blue" />
                <span className="text-gray-300">+212 522 XX XX XX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-casa-blue" />
                <span className="text-gray-300">contact@casahills.ma</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Casa Hills. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
