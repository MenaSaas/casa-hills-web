-- Update RLS policy for visits table to allow admin access
DROP POLICY IF EXISTS "No public read access to visits" ON public.visits;

-- Create new policy to allow admin read access to visits
CREATE POLICY "Admins can read visits data" 
ON public.visits 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
  )
);