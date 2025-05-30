
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FileText, Calendar, Users, CheckCircle, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Admissions = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    schoolLevel: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande d'inscription envoyée",
      description: "Nous vous contacterons dans les 48h pour finaliser votre dossier.",
    });
    setFormData({
      parentName: '',
      email: '',
      phone: '',
      childName: '',
      childAge: '',
      schoolLevel: '',
      message: ''
    });
  };

  const steps = [
    {
      icon: <FileText className="h-8 w-8 text-casa-blue" />,
      title: "1. Dossier de candidature",
      description: "Remplissez le formulaire en ligne et envoyez les documents requis"
    },
    {
      icon: <Calendar className="h-8 w-8 text-casa-blue" />,
      title: "2. Entretien",
      description: "Rencontre avec la direction et visite de l'établissement"
    },
    {
      icon: <Users className="h-8 w-8 text-casa-blue" />,
      title: "3. Évaluation",
      description: "Test de niveau adapté à l'âge de votre enfant (à partir du primaire)"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-casa-blue" />,
      title: "4. Admission",
      description: "Réponse définitive et finalisation de l'inscription"
    }
  ];

  const faqs = [
    {
      question: "Quels sont les frais de scolarité ?",
      answer: "Nos frais varient selon le niveau scolaire. Contactez-nous pour obtenir notre grille tarifaire détaillée. Nous proposons également des facilités de paiement."
    },
    {
      question: "Y a-t-il un service de transport scolaire ?",
      answer: "Oui, nous proposons un service de transport scolaire couvrant plusieurs quartiers de Casablanca. Les itinéraires sont adaptés chaque année selon les besoins."
    },
    {
      question: "Quelle est la politique d'admission ?",
      answer: "Les admissions se font sur dossier et entretien. Nous accueillons les élèves de toutes nationalités dans la limite des places disponibles."
    },
    {
      question: "Proposez-vous des bourses d'études ?",
      answer: "Nous accordons un nombre limité de bourses partielles basées sur l'excellence académique et les critères sociaux. Les demandes sont étudiées au cas par cas."
    },
    {
      question: "Quel est le calendrier des inscriptions ?",
      answer: "Les inscriptions pour l'année suivante commencent en janvier. Nous recommandons de déposer votre dossier avant mars pour maximiser vos chances."
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
              Admissions
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Rejoignez la famille Casa Hills et offrez à votre enfant une éducation d'excellence. 
              Découvrez notre processus d'admission simple et transparent.
            </p>
            <Button size="lg" className="bg-white text-casa-blue hover:bg-gray-100">
              Télécharger la brochure
            </Button>
          </div>
        </div>
      </section>

      {/* Processus d'admission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Processus d'Admission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus simple et transparent en 4 étapes pour intégrer Casa Hills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="mb-6 flex justify-center">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire d'inscription */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Formulaire de Pré-inscription
            </h2>
            <p className="text-xl text-gray-600">
              Commencez votre démarche d'inscription en remplissant ce formulaire.
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="parentName">Nom du parent/tuteur *</Label>
                  <Input
                    id="parentName"
                    value={formData.parentName}
                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="childName">Nom de l'enfant *</Label>
                  <Input
                    id="childName"
                    value={formData.childName}
                    onChange={(e) => setFormData({...formData, childName: e.target.value})}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="childAge">Âge de l'enfant *</Label>
                  <Input
                    id="childAge"
                    type="number"
                    min="3"
                    max="18"
                    value={formData.childAge}
                    onChange={(e) => setFormData({...formData, childAge: e.target.value})}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="schoolLevel">Niveau souhaité *</Label>
                  <Select onValueChange={(value) => setFormData({...formData, schoolLevel: value})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Sélectionnez un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maternelle">Maternelle</SelectItem>
                      <SelectItem value="primaire">Primaire</SelectItem>
                      <SelectItem value="college">Collège</SelectItem>
                      <SelectItem value="lycee">Lycée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="message">Message (optionnel)</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Parlez-nous de votre enfant, ses besoins particuliers, vos attentes..."
                  className="mt-2"
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full bg-casa-blue hover:bg-blue-700" size="lg">
                Envoyer la demande de pré-inscription
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Retrouvez les réponses aux questions les plus courantes sur nos admissions.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact rapide */}
      <section className="py-20 bg-casa-blue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold mb-6">
            Besoin d'informations complémentaires ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Notre équipe est à votre disposition pour répondre à toutes vos questions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3">
              <Phone className="h-6 w-6" />
              <span className="text-lg">+212 522 XX XX XX</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Mail className="h-6 w-6" />
              <span className="text-lg">admissions@casahills.ma</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admissions;
