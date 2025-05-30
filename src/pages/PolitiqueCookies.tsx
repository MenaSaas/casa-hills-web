
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cookie, Settings, BarChart, Shield } from 'lucide-react';

const PolitiqueCookies = () => {
  const cookieTypes = [
    {
      icon: <Cookie className="h-8 w-8 text-casa-blue" />,
      title: "Cookies essentiels",
      description: "Nécessaires au fonctionnement du site web",
      details: "Ces cookies sont indispensables pour naviguer sur le site et utiliser ses fonctionnalités de base. Ils ne peuvent pas être désactivés.",
      examples: "Session utilisateur, préférences de langue, sécurité"
    },
    {
      icon: <BarChart className="h-8 w-8 text-casa-blue" />,
      title: "Cookies analytiques",
      description: "Mesure d'audience et statistiques de visite",
      details: "Ces cookies nous aident à comprendre comment les visiteurs utilisent notre site pour l'améliorer.",
      examples: "Google Analytics, nombre de pages vues, temps passé sur le site"
    },
    {
      icon: <Settings className="h-8 w-8 text-casa-blue" />,
      title: "Cookies de fonctionnalité",
      description: "Amélioration de l'expérience utilisateur",
      details: "Ces cookies permettent au site de se souvenir de vos préférences pour améliorer votre expérience.",
      examples: "Préférences d'affichage, formulaires pré-remplis"
    },
    {
      icon: <Shield className="h-8 w-8 text-casa-blue" />,
      title: "Cookies de sécurité",
      description: "Protection contre les menaces",
      details: "Ces cookies protègent le site et ses utilisateurs contre les activités malveillantes.",
      examples: "Protection CSRF, détection de bots, authentification"
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
              Politique des Cookies
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Information sur l'utilisation des cookies sur le site web de l'école Casa Hills.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Cette politique explique comment l'école Casa Hills utilise les cookies 
              et technologies similaires sur son site web www.ecolecasahills.ma pour 
              améliorer votre expérience de navigation.
            </p>
            <p className="text-gray-600">
              <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>

          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Qu'est-ce qu'un cookie ?</h2>
            <p className="text-gray-700 mb-4">
              Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, tablette, smartphone) 
              lorsque vous visitez un site web. Les cookies permettent au site de reconnaître votre appareil 
              et de mémoriser certaines informations sur vos préférences ou actions passées.
            </p>
            <p className="text-gray-700">
              Les cookies ne contiennent aucune information personnelle qui permettrait de vous identifier 
              directement, mais ils peuvent nous aider à vous offrir une expérience de navigation plus 
              personnalisée et efficace.
            </p>
          </Card>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Types de cookies utilisés</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cookieTypes.map((type, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center space-x-3 mb-2">
                      {type.icon}
                      <CardTitle className="text-xl">{type.title}</CardTitle>
                    </div>
                    <p className="text-gray-600 font-medium">{type.description}</p>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-gray-700 mb-3">{type.details}</p>
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-600">
                        <strong>Exemples :</strong> {type.examples}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Durée de conservation</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Cookies de session :</strong> Supprimés automatiquement à la fermeture de votre navigateur.
                </p>
                <p>
                  <strong>Cookies persistants :</strong> Conservés sur votre appareil pendant une durée déterminée 
                  (généralement de quelques jours à 2 ans maximum) ou jusqu'à ce que vous les supprimiez.
                </p>
                <p>
                  <strong>Cookies analytiques :</strong> Conservés pendant 26 mois maximum conformément 
                  aux recommandations de la CNIL.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Vos droits et contrôles</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Consentement :</strong> Nous demandons votre consentement avant d'utiliser 
                  des cookies non essentiels via une bannière d'information.
                </p>
                <p>
                  <strong>Gestion des cookies :</strong> Vous pouvez à tout moment modifier vos préférences 
                  ou refuser les cookies via les paramètres de votre navigateur.
                </p>
                <p>
                  <strong>Suppression :</strong> Vous pouvez supprimer les cookies déjà stockés 
                  sur votre appareil via les paramètres de votre navigateur.
                </p>
                <p>
                  <strong>Impact du refus :</strong> Le refus des cookies peut affecter le fonctionnement 
                  de certaines fonctionnalités du site.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Configuration de votre navigateur</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Vous pouvez configurer votre navigateur pour qu'il vous avertisse de la présence de cookies 
                  ou pour qu'il les refuse systématiquement. Voici comment procéder selon votre navigateur :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies</li>
                  <li><strong>Firefox :</strong> Préférences → Vie privée et sécurité → Cookies</li>
                  <li><strong>Safari :</strong> Préférences → Confidentialité → Cookies</li>
                  <li><strong>Edge :</strong> Paramètres → Cookies et autorisations de site</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Cookies tiers</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Certains cookies peuvent être déposés par des services tiers que nous utilisons :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Google Analytics :</strong> Mesure d'audience et statistiques de visite</li>
                  <li><strong>Réseaux sociaux :</strong> Boutons de partage Facebook et Instagram</li>
                </ul>
                <p>
                  Ces services tiers ont leurs propres politiques de cookies que nous vous invitons à consulter.
                </p>
              </div>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="mt-16 text-center bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Questions sur les cookies ?</h3>
            <p className="text-gray-700 mb-6">
              Pour toute question concernant notre utilisation des cookies, 
              vous pouvez nous contacter :
            </p>
            <div className="space-y-2 text-casa-blue font-medium">
              <p>Email : G.scasahills@gmail.com</p>
              <p>Téléphone : 05 22 75 93 04 / 06 31 03 02 60</p>
              <p>Adresse : Complexe Résidentiel Albadr, Sidi Bernoussi, Casablanca</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PolitiqueCookies;
