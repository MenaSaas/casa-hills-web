
-- Create policy to allow public read access to images
CREATE POLICY "Public read access for casa-hills-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'casa-hills-images');

-- Create policy to allow anyone to upload images with file type restrictions
CREATE POLICY "Public upload access for casa-hills-images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'casa-hills-images' 
  AND (storage.extension(name) = ANY(ARRAY['jpg', 'jpeg', 'png', 'webp', 'gif']))
);

-- Create policy to allow deletion of images (for admin management)
CREATE POLICY "Allow deletion of casa-hills-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'casa-hills-images');
