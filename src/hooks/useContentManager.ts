import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Event {
  id: string;
  title: string;
  description: string;
  content?: string;
  event_date: string;
  location: string;
  image_url?: string;
  slug: string;
  status: 'draft' | 'published';
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  image_url?: string;
  slug: string;
  status: 'draft' | 'published';
  published_at?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export const useContentManager = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ýÿ]/g, 'y')
      .replace(/[ç]/g, 'c')
      .replace(/[ñ]/g, 'n')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  // Events management
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) throw error;
      setEvents((data || []) as Event[]);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Omit<Event, 'id' | 'slug' | 'created_at' | 'updated_at'>) => {
    try {
      const slug = generateSlug(eventData.title);
      const { data, error } = await supabase
        .from('events')
        .insert([{ ...eventData, slug }])
        .select()
        .single();

      if (error) throw error;
      await fetchEvents();
      return data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  };

  const updateEvent = async (id: string, eventData: Partial<Event>) => {
    try {
      if (eventData.title) {
        eventData.slug = generateSlug(eventData.title);
      }

      const { data, error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      await fetchEvents();
      return data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  };

  // Blog posts management
  const fetchBlogPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts((data || []) as BlogPost[]);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createBlogPost = async (postData: Omit<BlogPost, 'id' | 'slug' | 'created_at' | 'updated_at'>) => {
    try {
      const slug = generateSlug(postData.title);
      const dataToInsert = { 
        ...postData, 
        slug,
        published_at: postData.status === 'published' ? new Date().toISOString() : null
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([dataToInsert])
        .select()
        .single();

      if (error) throw error;
      await fetchBlogPosts();
      return data;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  };

  const updateBlogPost = async (id: string, postData: Partial<BlogPost>) => {
    try {
      if (postData.title) {
        postData.slug = generateSlug(postData.title);
      }

      // Set published_at when status changes to published
      if (postData.status === 'published' && !postData.published_at) {
        postData.published_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      await fetchBlogPosts();
      return data;
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchBlogPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw error;
    }
  };

  // Image upload helper
  const uploadImage = async (file: File, folder: 'events' | 'blog'): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('content-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('content-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  return {
    events,
    blogPosts,
    loading,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    fetchBlogPosts,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    uploadImage,
    generateSlug
  };
};