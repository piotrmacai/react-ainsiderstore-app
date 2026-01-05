import { createClient } from '@supabase/supabase-js';

// External Supabase connection for existing data
const supabaseUrl = 'https://zltkgdjyfzojirmppbex.supabase.co';
const supabaseAnonKey = 'sb_publishable_ARsRgAYn1dpCuEOgtC0c1Q_XwMTUjBY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions based on expected table schemas
export interface Tool {
  id: number;
  name: string;
  description: string;
  categories?: string;
  tags?: string;
  link?: string;
  top?: string;
  article?: string;
  created?: string;
}

export interface Prompt {
  id: number;
  name: string;
  category?: string;
  description?: string;
  prompt?: string;
  date?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  category?: string;
  image_url?: string;
  published_at: string;
  created_at: string;
}
