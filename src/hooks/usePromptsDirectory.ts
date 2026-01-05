import { useCallback, useEffect, useState } from "react";
import { supabase, Prompt } from "@/lib/supabase";

type PromptRow = Record<string, unknown>;

function normalizePrompt(row: PromptRow): Prompt {
  const get = <T,>(...keys: string[]): T | undefined => {
    for (const k of keys) {
      if (row[k] !== undefined && row[k] !== null) return row[k] as T;
    }
    return undefined;
  };

  return {
    id: Number(get<number | string>("id", "Id") ?? 0),
    name: String(get<string>("name", "Name") ?? ""),
    category: get<string>("category", "Category"),
    description: get<string>("description", "Description"),
    prompt: get<string>("prompt", "Prompt"),
    date: get<string>("date", "Date"),
  };
}

export function usePromptsDirectory() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchPrompts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // NOTE: this table uses a capitalized "Id" column (case-sensitive), so we must order by "Id".
      const { data, error } = await supabase
        .from("ainsider_prompts_directory")
        .select("*")
        .order("Id", { ascending: false });

      if (error) throw error;

      const normalized = (data ?? []).map((row) => normalizePrompt(row as PromptRow));
      setPrompts(normalized);

      const uniqueCategories = [
        ...new Set(normalized.map((p) => p.category).filter(Boolean)),
      ] as string[];
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch prompts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrompts();

    const channel = supabase
      .channel("prompts-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ainsider_prompts_directory",
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
