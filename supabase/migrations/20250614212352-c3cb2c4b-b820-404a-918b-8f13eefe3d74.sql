
-- Créer la table pour stocker les soumissions du formulaire de contact
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  privacy_accepted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer RLS sur la table
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre à tout le monde d'insérer des soumissions (formulaire public)
CREATE POLICY "Anyone can submit contact forms" 
  ON public.contact_submissions 
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Politique pour empêcher la lecture publique des soumissions
-- (seuls les administrateurs pourront les voir via une interface dédiée)
CREATE POLICY "No public read access to contact submissions"
  ON public.contact_submissions
  FOR SELECT
  TO anon, authenticated
  USING (false);
