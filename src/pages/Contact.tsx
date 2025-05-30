
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacyAccepted: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacyAccepted) {
      toast({
        title: "Erreur",
        description: "Vous devez accepter la politique de confidentialité pour continuer.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Message envoyé avec succès",
      description: "Merci pour votre message. Nous vous répondrons dans les plus brefs délais.",
    });
    
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      privacyAccepted: false
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-casa-blue" />,
      title: "Adresse",
      content: "Quartier Anfa, Boulevard de la Corniche\nCasablanca 20000, Maroc"
    },
    {
      icon: <Phone className="h-6 w-6 text-casa-blue" />,
      title: "Téléphone",
      content: "+212 522 XX XX XX"
    },
    {
      icon: <Mail className="h-6 w-6 text-casa-blue" />,
      title: "Email",
      content: "contact@casahills.ma"
    },
    {
      icon: <Clock className="h-6 w-6 text-casa-blue" />,
      title: "Horaires d'ouverture",
      content: "Lundi - Vendredi : 8h00 - 17h00\nSamedi : 9h00 - 13h00\nDimanche : Fermé"
    }
  ];

  const faqs = [
    {
      question: "Comment inscrire mon enfant à Casa Hills ?",
      answer: "Pour inscrire votre enfant, vous devez d'abord remplir le formulaire de pré-inscription en ligne, puis prendre rendez-vous pour un entretien. Notre équipe vous guidera à travers toutes les étapes du processus d'admission."
    },
    {
      question: "Quels sont les frais de scolarité ?",
      answer: "Nos frais de scolarité varient selon le niveau d'études. Nous proposons également des facilités de paiement et des bourses d'excellence. Contactez-nous pour obtenir notre grille tarifaire détaillée."
    },
    {
      question: "Y a-t-il un service de transport scolaire ?",
      answer: "Oui, nous proposons un service de transport scolaire qui dessert plusieurs quartiers de Casablanca. Les itinéraires sont optimisés chaque année selon la demande des familles."
    },
    {
      question: "Quelles langues sont enseignées à l'école ?",
      answer: "Casa Hills propose un enseignement multilingue avec le français comme langue principale, l'arabe, l'anglais dès le primaire, et l'espagnol au collège et lycée."
    },
    {
      question: "L'école accueille-t-elle des élèves de toutes nationalités ?",
      answer: "Absolument ! Casa Hills accueille des élèves de toutes nationalités dans un environnement multiculturel enrichissant qui prépare nos élèves à un monde globalisé."
    },
    {
      question: "Peut-on visiter l'école avant l'inscription ?",
      answer: "Bien sûr ! Nous organisons des visites guidées tous les mardis et jeudis sur rendez-vous. Vous pouvez également assister à nos journées portes ouvertes organisées plusieurs fois par an."
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
              Contactez-nous
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Nous sommes là pour répondre à toutes vos questions et vous accompagner 
              dans votre projet éducatif. N'hésitez pas à nous contacter !
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
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

          {/* Map Section */}
          <div className="mb-16">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-center">Localisation</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-casa-blue" />
                    <p className="text-lg">Carte interactive Google Maps</p>
                    <p className="text-sm mt-2">
                      Quartier Anfa, Boulevard de la Corniche<br />
                      Casablanca 20000, Maroc
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Media Links */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-6">Suivez-nous</h3>
            <div className="flex justify-center space-x-6">
              <a href="#" className="bg-casa-blue hover:bg-blue-700 text-white p-3 rounded-full transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="bg-casa-red hover:bg-red-700 text-white p-3 rounded-full transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="bg-casa-blue hover:bg-blue-700 text-white p-3 rounded-full transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Formulaire de Contact
            </h2>
            <p className="text-xl text-gray-600">
              Remplissez ce formulaire et nous vous répondrons rapidement.
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">Nom complet *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    required
                    className="mt-2"
                    placeholder="Votre nom complet"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Adresse e-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="mt-2"
                    placeholder="votre.email@exemple.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone">Numéro de téléphone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    className="mt-2"
                    placeholder="+212 6XX XX XX XX"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Objet de la demande *</Label>
                  <Select onValueChange={(value) => setFormData({...formData, subject: value})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Sélectionnez un objet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="informations">Informations générales</SelectItem>
                      <SelectItem value="admissions">Admissions</SelectItem>
                      <SelectItem value="visite">Visite de l'école</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  placeholder="Décrivez votre demande en détail..."
                  className="mt-2"
                  rows={6}
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacy"
                  checked={formData.privacyAccepted}
                  onCheckedChange={(checked) => setFormData({...formData, privacyAccepted: checked as boolean})}
                  required
                />
                <Label htmlFor="privacy" className="text-sm leading-relaxed">
                  J'accepte la <a href="/politique-confidentialite" className="text-casa-blue hover:underline">politique de confidentialité</a> de l'école Casa Hills. *
                </Label>
              </div>

              <Button type="submit" className="w-full bg-casa-blue hover:bg-blue-700" size="lg">
                <Send className="mr-2 h-5 w-5" />
                Envoyer le message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Call to Action Buttons */}
      <section className="py-16 bg-casa-beige">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">
            Prêt à rejoindre Casa Hills ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button size="lg" className="bg-casa-blue hover:bg-blue-700">
              Demander une brochure
            </Button>
            <Button size="lg" variant="outline" className="border-casa-blue text-casa-blue hover:bg-casa-blue hover:text-white">
              Planifier une visite
            </Button>
            <Button size="lg" className="bg-casa-red hover:bg-red-700">
              S'inscrire maintenant
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Trouvez rapidement les réponses à vos questions les plus courantes.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:text-casa-blue">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
