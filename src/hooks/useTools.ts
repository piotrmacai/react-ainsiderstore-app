import { useState, useEffect, useCallback } from 'react';
import { supabase, Tool } from '@/lib/supabase';

export function useTools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const fetchTools = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ainsider_store_directory')
        .select('*')
        .order('created', { ascending: false });

      if (error) throw error;

      setTools(data || []);

      // Extract unique categories and tags (both are single string values now)
      const uniqueCategories = [...new Set(data?.map(t => t.categories).filter(Boolean))] as string[];
      const uniqueTags = [...new Set(data?.map(t => t.tags).filter(Boolean))] as string[];
      
      setCategories(uniqueCategories);
      setTags(uniqueTags);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tools');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTools();

    // Set up realtime subscription
    const channel = supabase
      .channel('tools-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ainsider_store_directory',
        },
        () => {
          fetchTools();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchTools]);

  return { tools, loading, error, categories, tags, refetch: fetchTools };
}
