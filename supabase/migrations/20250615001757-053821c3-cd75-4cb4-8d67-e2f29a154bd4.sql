
-- Créer une fonction sécurisée pour vérifier les mots de passe admin
CREATE OR REPLACE FUNCTION public.verify_admin_password(
  input_email TEXT,
  input_password TEXT
)
RETURNS TABLE(
  admin_id UUID,
  admin_email TEXT,
  admin_full_name TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.email,
    a.full_name
  FROM public.admin_users a
  WHERE a.email = input_email
    AND a.password_hash = crypt(input_password, a.password_hash);
END;
$$;

-- Supprimer l'ancien compte admin par défaut
DELETE FROM public.admin_users WHERE email = 'admin@casahills.ma';

-- Créer le nouveau compte administrateur sécurisé
INSERT INTO public.admin_users (email, password_hash, full_name)
VALUES (
  'casahills@admin.com',
  crypt('Casahills@2026', gen_salt('bf')),
  'Administrateur Casa Hills'
);
