-- Create visits tracking table
CREATE TABLE public.visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can track visits" 
ON public.visits 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "No public read access to visits" 
ON public.visits 
FOR SELECT 
USING (false);

-- Create index for better performance
CREATE INDEX idx_visits_created_at ON public.visits(created_at);
CREATE INDEX idx_visits_page_path ON public.visits(page_path);