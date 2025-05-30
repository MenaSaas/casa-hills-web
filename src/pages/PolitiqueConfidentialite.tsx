
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

const PolitiqueConfidentialite = () => {
  const sections = [
    {
      icon: <Shield className="h-8 w-8 text-casa-blue" />,
      title: "Collecte des données",
      content: "Casa Hills collecte uniquement les données personnelles nécessaires à la gestion de la relation éducative et administrative avec les familles. Ces données incluent les informations de contact, les informations sur l'élève et les données académiques."
    },
    {
      icon: <Lock className="h-8 w-8 text-casa-blue" />,
      title: "Utilisation des données",
      content: "Vos données sont utilisées exclusivement pour : la gestion des inscriptions et de la scolarité, la communication avec les familles, l'amélioration de nos services éducatifs, et le respect de nos obligations légales."
    },
    {
      icon: <Eye className="h-8 w-8 text-casa-blue" />,
      title: "Partage des données",
      content: "Casa Hills ne partage jamais vos données personnelles avec des tiers à des fins commerciales. Les données peuvent être partagées uniquement avec les autorités compétentes dans le cadre légal ou avec votre consentement explicite."
    },
    {
      icon: <UserCheck className="h-8 w-8 text-casa-blue" />,
      title: "Vos droits",
      content: "Conformément au RGPD, vous disposez des droits d'accès, de rectification, d'effacement, de limitation du traitement, de portabilité des données et d'opposition. Pour exercer ces droits, contactez-nous à contact@casahills.ma."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-casa-blue to-casa-red text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-display font-bold mb-6">
              Politique de Confidentialité
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Casa Hills s'engage à protéger et respecter votre vie privée conformément au RGPD.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              La présente politique de confidentialité décrit comment Casa Hills collecte, utilise et protège 
              vos données personnelles lorsque vous utilisez notre site web ou nos services éducatifs.
            </p>
            <p className="text-gray-600">
              <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {sections.map((section, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center space-x-3">
                    {section.icon}
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-600 leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Sections */}
          <div className="space-y-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Responsable du traitement</h2>
              <p className="text-gray-700 mb-4">
                Casa Hills, école privée située au Quartier Anfa, Boulevard de la Corniche, 
                Casablanca 20000, Maroc, est le responsable du traitement de vos données personnelles.
              </p>
              <p className="text-gray-700">
                <strong>Contact :</strong> contact@casahills.ma | +212 522 XX XX XX
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Durée de conservation</h2>
              <p className="text-gray-700 mb-4">
                Nous conservons vos données personnelles pendant la durée nécessaire aux finalités 
                pour lesquelles elles ont été collectées :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Données de prospection : 3 ans maximum</li>
                <li>Dossiers élèves : Durée de scolarité + 50 ans (archives légales)</li>
                <li>Données de contact : Tant que la relation est active + 3 ans</li>
              </ul>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Sécurité des données</h2>
              <p className="text-gray-700 mb-4">
                Casa Hills met en œuvre des mesures techniques et organisationnelles appropriées 
                pour protéger vos données contre :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>L'accès non autorisé</li>
                <li>La modification, la divulgation ou la destruction illicites</li>
                <li>La perte accidentelle</li>
              </ul>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Cookies et technologies similaires</h2>
              <p className="text-gray-700 mb-4">
                Notre site web utilise des cookies techniques nécessaires au bon fonctionnement 
                du site. Nous utilisons également des cookies d'analyse pour améliorer nos services.
              </p>
              <p className="text-gray-700">
                Vous pouvez configurer votre navigateur pour refuser les cookies, 
                mais cela pourrait affecter le fonctionnement du site.
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Modifications de cette politique</h2>
              <p className="text-gray-700">
                Casa Hills se réserve le droit de modifier cette politique de confidentialité 
                à tout moment. Les modifications seront publiées sur cette page avec 
                une nouvelle date de mise à jour.
              </p>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="mt-16 text-center bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Questions sur cette politique ?</h3>
            <p className="text-gray-700 mb-6">
              Si vous avez des questions concernant cette politique de confidentialité 
              ou l'utilisation de vos données personnelles, contactez-nous :
            </p>
            <div className="space-y-2 text-casa-blue font-medium">
              <p>Email : contact@casahills.ma</p>
              <p>Téléphone : +212 522 XX XX XX</p>
              <p>Adresse : Quartier Anfa, Boulevard de la Corniche, Casablanca 20000</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialite;
