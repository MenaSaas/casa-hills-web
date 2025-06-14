
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';

const ContactInfo = () => {
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-casa-blue" />,
      title: "Adresse",
      content: "Complexe Résidentiel Albadr\nSidi Bernoussi, Casablanca, Maroc"
    },
    {
      icon: <Phone className="h-6 w-6 text-casa-blue" />,
      title: "Téléphone",
      content: "05 22 75 93 04\n+212 6 63 51 44 32"
    },
    {
      icon: <Mail className="h-6 w-6 text-casa-blue" />,
      title: "Email",
      content: "G.scasahills@gmail.com"
    },
    {
      icon: <Clock className="h-6 w-6 text-casa-blue" />,
      title: "Horaires d'ouverture",
      content: "Lundi - Vendredi : 8h00 - 17h00\nSamedi : 9h00 - 13h00\nDimanche : Fermé"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Nos Coordonnées
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Retrouvez toutes les informations pour nous joindre facilement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="mb-4 flex justify-center">{info.icon}</div>
                <h3 className="text-lg font-semibold mb-3">{info.title}</h3>
                <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Google Maps Section */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="text-center py-4">
                <h3 className="text-xl font-semibold">Localisation</h3>
              </div>
              <div className="h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.5476421574387!2d-7.5311!3d33.6069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd6c72b5b5af%3A0x123456789!2sComplexe%20R%C3%A9sidentiel%20Albadr%2C%20Sidi%20Bernoussi%2C%20Casablanca!5e0!3m2!1sfr!2sma!4v1639416589123!5m2!1sfr!2sma"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation Casa Hills - Complexe Résidentiel Albadr, Sidi Bernoussi, Casablanca"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Media Links */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-6">Suivez-nous</h3>
          <div className="flex justify-center space-x-6">
            <a href="https://web.facebook.com/profile.php?id=100078730485495" target="_blank" rel="noopener noreferrer" className="bg-casa-blue hover:bg-blue-700 text-white p-3 rounded-full transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/ecolecasahills/" target="_blank" rel="noopener noreferrer" className="bg-casa-red hover:bg-red-700 text-white p-3 rounded-full transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
