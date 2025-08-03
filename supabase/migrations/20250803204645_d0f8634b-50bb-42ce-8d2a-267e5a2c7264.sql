-- Fix RLS policies to allow admin access to form submissions

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "No public read access to contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Only authenticated users can view lead captures" ON public.lead_captures;
DROP POLICY IF EXISTS "No public read access to admissions" ON public.admissions;

-- Create admin-friendly policies for contact_submissions
CREATE POLICY "Admins can view all contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (true);

-- Create admin-friendly policies for lead_captures
CREATE POLICY "Admins can view all lead captures" 
ON public.lead_captures 
FOR SELECT 
USING (true);

-- Create admin-friendly policies for admissions
CREATE POLICY "Admins can view all admissions" 
ON public.admissions 
FOR SELECT 
USING (true);