
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
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

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          privacy_accepted: formData.privacyAccepted
        });

      if (error) {
        console.error('Erreur lors de l\'enregistrement:', error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.",
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
    } catch (error) {
      console.error('Erreur inattendue:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  className="mt-2"
                  placeholder="+212 6XX XX XX XX"
                />
              </div>
              <div>
                <Label htmlFor="subject">Objet de la demande *</Label>
                <Select 
                  onValueChange={(value) => setFormData({...formData, subject: value})}
                  disabled={isSubmitting}
                  value={formData.subject}
                >
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
              <Label htmlFor="privacy" className="text-sm leading-relaxed">
                J'accepte la <a href="/politique-confidentialite" className="text-casa-blue hover:underline">politique de confidentialité</a> de l'école Casa Hills. *
              </Label>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-casa-blue hover:bg-blue-700" 
              size="lg"
              disabled={isSubmitting}
            >
              <Send className="mr-2 h-5 w-5" />
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ContactForm;
