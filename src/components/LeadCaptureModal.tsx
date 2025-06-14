
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Star, Users, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNeverShow: () => void;
}

const LeadCaptureModal = ({ isOpen, onClose, onNeverShow }: LeadCaptureModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    levelInterest: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('lead_captures')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          child_name: formData.childName,
          child_age: parseInt(formData.childAge),
          level_interest: formData.levelInterest
        });

      if (error) throw error;

      toast({
        title: "Merci pour votre intérêt !",
        description: "Nous vous contacterons dans les 24h pour discuter de l'inscription de votre enfant.",
      });

      onClose();
    } catch (error) {
      console.error('Error submitting lead capture:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white border-2 border-casa-blue/20 shadow-2xl">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-display font-bold text-casa-blue mb-2">
                Intéressé par Casa Hills ?
              </DialogTitle>
              <p className="text-gray-600 text-sm mb-4">
                Réservez votre place pour une visite personnalisée et découvrez notre excellence éducative.
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Points forts */}
        <div className="grid grid-cols-3 gap-3 mb-6 text-center">
          <div className="p-3 bg-casa-blue/5 rounded-lg">
            <Star className="h-6 w-6 text-casa-blue mx-auto mb-1" />
            <span className="text-xs font-medium text-casa-blue">98% Réussite</span>
          </div>
          <div className="p-3 bg-casa-blue/5 rounded-lg">
            <Users className="h-6 w-6 text-casa-blue mx-auto mb-1" />
            <span className="text-xs font-medium text-casa-blue">500+ Élèves</span>
          </div>
          <div className="p-3 bg-casa-blue/5 rounded-lg">
            <Heart className="h-6 w-6 text-casa-blue mx-auto mb-1" />
            <span className="text-xs font-medium text-casa-blue">15 Ans</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="fullName" className="text-sm font-medium">Votre nom *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                required
                className="mt-1"
                placeholder="Nom complet"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="mt-1"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm font-medium">Téléphone *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
              className="mt-1"
              placeholder="+212 6 XX XX XX XX"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="childName" className="text-sm font-medium">Nom de l'enfant *</Label>
              <Input
                id="childName"
                value={formData.childName}
                onChange={(e) => setFormData({...formData, childName: e.target.value})}
                required
                className="mt-1"
                placeholder="Prénom"
              />
            </div>
            <div>
              <Label htmlFor="childAge" className="text-sm font-medium">Âge *</Label>
              <Input
                id="childAge"
                type="number"
                min="3"
                max="18"
                value={formData.childAge}
                onChange={(e) => setFormData({...formData, childAge: e.target.value})}
                required
                className="mt-1"
                placeholder="5"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="levelInterest" className="text-sm font-medium">Niveau souhaité *</Label>
            <Select onValueChange={(value) => setFormData({...formData, levelInterest: value})}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Sélectionnez un niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maternelle">Maternelle (3-6 ans)</SelectItem>
                <SelectItem value="primaire">Primaire (6-11 ans)</SelectItem>
                <SelectItem value="college">Collège (11-15 ans)</SelectItem>
                <SelectItem value="lycee">Lycée (15-18 ans)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-casa-red hover:bg-red-700 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isSubmitting ? 'Envoi en cours...' : '🎓 Réserver ma visite gratuite'}
            </Button>
            
            <div className="flex justify-center gap-4 text-xs">
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Plus tard
              </button>
              <button
                type="button"
                onClick={onNeverShow}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Ne plus montrer
              </button>
            </div>
          </div>
        </form>

        <p className="text-xs text-gray-500 text-center mt-3">
          En soumettant ce formulaire, vous acceptez d'être contacté par Casa Hills.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;
