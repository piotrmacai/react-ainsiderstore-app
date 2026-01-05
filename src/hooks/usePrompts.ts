import { useState, useEffect, useCallback } from 'react';
import { supabase, Prompt } from '@/lib/supabase';

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchPrompts = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ainsider_prompts_directory')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;

      setPrompts(data || []);

      // Extract unique categories
      const uniqueCategories = [...new Set(data?.map(p => p.category).filter(Boolean))] as string[];
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prompts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrompts();

    // Set up realtime subscription
    const channel = supabase
      .channel('prompts-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ainsider_prompts_directory',
        },
        () => {
          fetchPrompts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPrompts]);

  return { prompts, loading, error, categories, refetch: fetchPrompts };
}
