
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, User, Globe, Copyright } from 'lucide-react';

const MentionsLegales = () => {
  const sections = [
    {
      icon: <Building className="h-8 w-8 text-casa-blue" />,
      title: "Informations sur l'établissement",
      content: "Casa Hills est un établissement scolaire privé situé au Complexe Résidentiel Albadr, Sidi Bernoussi, Casablanca, Maroc. L'école est dûment autorisée par les autorités compétentes marocaines."
    },
    {
      icon: <User className="h-8 w-8 text-casa-blue" />,
      title: "Responsable éditorial",
      content: "La direction de l'école Casa Hills assure la responsabilité éditoriale du contenu publié sur ce site web. Contact : G.scasahills@gmail.com"
    },
    {
      icon: <Globe className="h-8 w-8 text-casa-blue" />,
      title: "Hébergement",
      content: "Ce site web est hébergé par Lovable (lovable.app). Les serveurs sont situés dans l'Union Européenne et respectent les normes de sécurité en vigueur."
    },
    {
      icon: <Copyright className="h-8 w-8 text-casa-blue" />,
      title: "Propriété intellectuelle",
      content: "Tous les contenus de ce site (textes, images, logos, etc.) sont la propriété exclusive de l'école Casa Hills, sauf mention contraire. Toute reproduction est interdite sans autorisation préalable."
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
              Mentions Légales
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Informations légales et réglementaires concernant le site web de l'école Casa Hills.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Conformément aux dispositions de la loi marocaine et internationale, 
              nous vous informons des mentions légales applicables au site web de l'école Casa Hills.
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
              <h2 className="text-2xl font-bold mb-4">Identification de l'établissement</h2>
              <div className="space-y-4 text-gray-700">
                <p><strong>Dénomination :</strong> École Casa Hills</p>
                <p><strong>Adresse :</strong> Complexe Résidentiel Albadr, Sidi Bernoussi, Casablanca, Maroc</p>
                <p><strong>Téléphone :</strong> 05 22 75 93 04 / 06 31 03 02 60</p>
                <p><strong>Email :</strong> G.scasahills@gmail.com</p>
                <p><strong>Secteur d'activité :</strong> Enseignement privé</p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Conditions d'utilisation</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  L'utilisation de ce site web implique l'acceptation pleine et entière 
                  des conditions générales d'utilisation décrites ci-après.
                </p>
                <p>
                  L'école Casa Hills se réserve le droit de modifier ces mentions légales 
                  à tout moment. Il est donc conseillé de les consulter régulièrement.
                </p>
                <p>
                  Ce site et l'ensemble de son contenu relèvent de la législation marocaine 
                  et des juridictions compétentes de Casablanca.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Limitation de responsabilité</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  L'école Casa Hills s'efforce d'assurer au mieux de ses possibilités, 
                  l'exactitude et la mise à jour des informations diffusées sur ce site.
                </p>
                <p>
                  Toutefois, elle ne peut garantir l'exactitude, la précision ou l'exhaustivité 
                  des informations mises à disposition sur ce site.
                </p>
                <p>
                  En conséquence, l'école Casa Hills décline toute responsabilité pour toute 
                  imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Droit applicable et juridiction</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Les présentes mentions légales sont régies par le droit marocain.
                </p>
                <p>
                  En cas de litige, les tribunaux de Casablanca seront seuls compétents 
                  pour connaître du différend.
                </p>
              </div>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="mt-16 text-center bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Questions juridiques ?</h3>
            <p className="text-gray-700 mb-6">
              Pour toute question concernant ces mentions légales, 
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

export default MentionsLegales;
