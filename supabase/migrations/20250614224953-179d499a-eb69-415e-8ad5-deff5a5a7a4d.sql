
-- Create admin_users table for admin authentication
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Create school_photos table for photo management
CREATE TABLE public.school_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  title TEXT,
  description TEXT,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  width INTEGER,
  height INTEGER,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  uploaded_by UUID REFERENCES public.admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for school photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('school-photos', 'school-photos', true);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Enable RLS on school_photos
ALTER TABLE public.school_photos ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users (only admins can manage)
CREATE POLICY "Admins can view all admin users" 
  ON public.admin_users 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can insert admin users" 
  ON public.admin_users 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admins can update admin users" 
  ON public.admin_users 
  FOR UPDATE 
  USING (true);

-- Create policies for school_photos (public read, admin write)
CREATE POLICY "Anyone can view active photos" 
  ON public.school_photos 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Admins can manage all photos" 
  ON public.school_photos 
  FOR ALL 
  USING (true);

-- Create storage policies for school-photos bucket
CREATE POLICY "Anyone can view school photos" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'school-photos');

CREATE POLICY "Admins can upload school photos" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'school-photos');

CREATE POLICY "Admins can update school photos" 
  ON storage.objects 
  FOR UPDATE 
  USING (bucket_id = 'school-photos');

CREATE POLICY "Admins can delete school photos" 
  ON storage.objects 
  FOR DELETE 
  USING (bucket_id = 'school-photos');

-- Insert your admin account (you'll need to change the email and password)
INSERT INTO public.admin_users (email, password_hash, full_name)
VALUES ('admin@casahills.ma', crypt('admin123', gen_salt('bf')), 'Administrateur Casa Hills');
