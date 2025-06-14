
-- Create a table for lead captures
CREATE TABLE public.lead_captures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  child_name TEXT NOT NULL,
  child_age INTEGER NOT NULL,
  level_interest TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to the table
ALTER TABLE public.lead_captures ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to INSERT lead captures (public form)
CREATE POLICY "Anyone can create lead captures" 
  ON public.lead_captures 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to prevent public SELECT access (admin only)
CREATE POLICY "Only authenticated users can view lead captures" 
  ON public.lead_captures 
  FOR SELECT 
  USING (false);
