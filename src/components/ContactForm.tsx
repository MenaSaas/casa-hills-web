
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Send, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CSRFProtectedForm } from '@/components/security/CSRFProtection';
import { 
  sanitizeInput, 
  validateEmail, 
  validatePhone, 
  validateField,
  formRateLimiter,
  detectInjectionAttempt 
} from '@/utils/inputValidation';
import { securityMonitor } from '@/utils/securityMonitoring';

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
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  // Validation en temps réel
  const validateForm = () => {
    const errors: Record<string, string[]> = {};

    // Validation du nom
    const nameValidation = validateField(formData.fullName, {
      required: true,
      minLength: 2,
      maxLength: 100,
      pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/
    });
    if (!nameValidation.isValid) {
      errors.fullName = nameValidation.errors;
    }

    // Validation de l'email
    if (!validateEmail(formData.email)) {
      errors.email = ['Format d\'email invalide'];
    }

    // Validation du téléphone
    if (!validatePhone(formData.phone)) {
      errors.phone = ['Format de téléphone invalide'];
    }

    // Validation du message
    const messageValidation = validateField(formData.message, {
      required: true,
      minLength: 10,
      maxLength: 1000
    });
    if (!messageValidation.isValid) {
      errors.message = messageValidation.errors;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Nettoyer les erreurs de validation pour ce champ
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent, csrfToken: string) => {
    e.preventDefault();
    
    // Vérifier le rate limiting
    const clientId = 'contact_form';
    if (!formRateLimiter.isAllowed(clientId)) {
      const remainingTime = formRateLimiter.getRemainingTime(clientId);
      
      await securityMonitor.logAlert({
        type: 'rate_limit_exceeded',
        severity: 'low',
        message: 'Limite de soumission de formulaire dépassée',
        details: { form: 'contact', remainingTime }
      });

      toast({
        title: "Trop de soumissions",
        description: `Veuillez attendre ${Math.ceil(remainingTime / 60000)} minutes avant de renvoyer un message.`,
        variant: "destructive"
      });
      return;
    }

    // Valider le formulaire
    if (!validateForm()) {
      toast({
        title: "Erreurs de validation",
        description: "Veuillez corriger les erreurs dans le formulaire",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.privacyAccepted) {
      toast({
        title: "Politique de confidentialité",
        description: "Vous devez accepter la politique de confidentialité pour continuer.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitiser tous les inputs
      const sanitizedData = {
        fullName: sanitizeInput(formData.fullName),
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message)
      };

      // Détecter les tentatives d'injection
      const injectionFields = Object.entries(sanitizedData).filter(([_, value]) => 
        detectInjectionAttempt(value)
      );

      if (injectionFields.length > 0) {
        await securityMonitor.logAlert({
          type: 'injection_attempt',
          severity: 'high',
          message: 'Tentative d\'injection détectée dans le formulaire de contact',
          details: { 
            suspiciousFields: injectionFields.map(([field]) => field),
            formData: sanitizedData 
          }
        });

        toast({
          title: "Contenu suspect détecté",
          description: "Votre message contient du contenu non autorisé. Cette tentative a été enregistrée.",
          variant: "destructive"
        });
        return;
      }

      // Enregistrer la soumission
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          full_name: sanitizedData.fullName,
          email: sanitizedData.email,
          phone: sanitizedData.phone,
          subject: sanitizedData.subject,
          message: sanitizedData.message,
          privacy_accepted: formData.privacyAccepted
        });

      if (error) {
        console.error('Erreur lors de l\'enregistrement:', error);
        
        await securityMonitor.logAlert({
          type: 'suspicious_activity',
          severity: 'medium',
          message: 'Erreur lors de l\'enregistrement du formulaire de contact',
          details: { error: error.message, formData: sanitizedData }
        });

        toast({
          title: "Erreur technique",
          description: "Une erreur est survenue. Veuillez réessayer plus tard.",
          variant: "destructive"
        });
        return;
      }

      // Enregistrer l'événement de sécurité
      await securityMonitor.logAlert({
        type: 'suspicious_activity',
        severity: 'low',
        message: 'Nouveau message de contact reçu',
        details: { email: sanitizedData.email, subject: sanitizedData.subject }
      });

      toast({
        title: "Message envoyé avec succès",
        description: "Merci pour votre message. Nous vous répondrons dans les plus brefs délais.",
      });
      
      // Réinitialiser le formulaire
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        privacyAccepted: false
      });
      setValidationErrors({});

    } catch (error) {
      console.error('Erreur inattendue:', error);
      
      await securityMonitor.logAlert({
        type: 'suspicious_activity',
        severity: 'medium',
        message: 'Erreur inattendue lors de la soumission du formulaire',
        details: { error: error instanceof Error ? error.message : 'Unknown error' }
      });

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
            Formulaire de Contact Sécurisé
          </h2>
          <p className="text-xl text-gray-600 flex items-center justify-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Vos données sont protégées et chiffrées
          </p>
        </div>

        <Card className="p-8">
          <CSRFProtectedForm onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName">Nom complet *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="mt-2"
                  placeholder="Votre nom complet"
                  maxLength={100}
                />
                {validationErrors.fullName && (
                  <div className="text-sm text-red-600 mt-1">
                    {validationErrors.fullName.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="email">Adresse e-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="mt-2"
                  placeholder="votre.email@exemple.com"
                  maxLength={254}
                />
                {validationErrors.email && (
                  <div className="text-sm text-red-600 mt-1">
                    {validationErrors.email.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone">Numéro de téléphone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="mt-2"
                  placeholder="+212 6XX XX XX XX"
                  maxLength={20}
                />
                {validationErrors.phone && (
                  <div className="text-sm text-red-600 mt-1">
                    {validationErrors.phone.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="subject">Objet de la demande *</Label>
                <Select 
                  onValueChange={(value) => handleInputChange('subject', value)}
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
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
                disabled={isSubmitting}
                placeholder="Décrivez votre demande en détail..."
                className="mt-2"
                rows={6}
                maxLength={1000}
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.message.length}/1000 caractères
              </div>
              {validationErrors.message && (
                <div className="text-sm text-red-600 mt-1">
                  {validationErrors.message.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="privacy"
                checked={formData.privacyAccepted}
                onCheckedChange={(checked) => handleInputChange('privacyAccepted', checked as boolean)}
                required
                disabled={isSubmitting}
              />
              <Label htmlFor="privacy" className="text-sm leading-relaxed">
                J'accepte la <a href="/politique-confidentialite" className="text-casa-blue hover:underline">politique de confidentialité</a> de l'école Casa Hills et consens au traitement sécurisé de mes données. *
              </Label>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex items-center gap-2 text-green-700">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">Protection des données</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                Ce formulaire est protégé par des mesures de sécurité avancées. Vos données sont chiffrées et traitées de manière confidentielle.
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-casa-blue hover:bg-blue-700" 
              size="lg"
              disabled={isSubmitting}
            >
              <Send className="mr-2 h-5 w-5" />
              {isSubmitting ? 'Envoi sécurisé en cours...' : 'Envoyer le message sécurisé'}
            </Button>
          </CSRFProtectedForm>
        </Card>
      </div>
    </section>
  );
};

export default ContactForm;
