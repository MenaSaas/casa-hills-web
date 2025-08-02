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
import { FileText, Calendar, Users, CheckCircle, Phone, Mail, FileImage, ClipboardList, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Admissions = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    schoolLevel: '',
    message: '',
    privacyAccepted: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacyAccepted) {
      toast({
        title: "Erreur",
        description: "Vous devez accepter la politique de confidentialité pour continuer.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('admissions')
        .insert([
          {
            parent_name: formData.parentName,
            email: formData.email,
            phone: formData.phone,
            child_name: formData.childName,
            child_age: parseInt(formData.childAge),
            school_level: formData.schoolLevel,
            message: formData.message || null,
            privacy_accepted: formData.privacyAccepted
          }
        ]);

      if (error) {
        throw error;
      }

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
        message: '',
        privacyAccepted: false
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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

  const requiredDocuments = [
    {
      icon: <FileText className="h-6 w-6 text-casa-blue" />,
      title: "Acte de naissance",
      description: "Copie certifiée conforme de l'acte de naissance de l'enfant"
    },
    {
      icon: <ClipboardList className="h-6 w-6 text-casa-blue" />,
      title: "Relevé scolaire",
      description: "Bulletins scolaires des deux dernières années (si applicable)"
    },
    {
      icon: <FileImage className="h-6 w-6 text-casa-blue" />,
      title: "Photo d'identité",
      description: "2 photos d'identité récentes de l'enfant"
    },
    {
      icon: <Heart className="h-6 w-6 text-casa-blue" />,
      title: "Dossier médical",
      description: "Certificat médical et carnet de vaccination à jour"
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
          </div>
        </div>
      </section>

      {/* Documents requis */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">
              Documents Requis pour l'Admission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Préparez ces documents essentiels pour constituer votre dossier d'admission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {requiredDocuments.map((document, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="mb-4 flex justify-center">{document.icon}</div>
                  <h3 className="text-lg font-semibold mb-3">{document.title}</h3>
                  <p className="text-gray-600 text-sm">{document.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-4">Déposer votre dossier</h3>
              <p className="text-gray-600 mb-4">
                Une fois vos documents prêts, contactez-nous pour organiser le dépôt de votre dossier.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4 text-casa-blue" />
                  <span>05 22 75 93 04 / +212 6 63 51 44 32</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="h-4 w-4 text-casa-blue" />
                  <span>G.scasahills@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processus d'admission */}
      <section className="py-20">
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
      <section className="py-20 bg-gray-50">
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

              <Button 
                type="submit" 
                className="w-full bg-casa-blue hover:bg-blue-700" 
                size="lg"
                disabled={loading}
              >
                {loading ? "Envoi en cours..." : "Envoyer la demande de pré-inscription"}
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
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

      <Footer />
    </div>
  );
};

export default Admissions;
