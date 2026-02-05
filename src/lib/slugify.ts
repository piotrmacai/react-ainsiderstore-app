import { Tool } from './supabase';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function createToolSlug(id: number, name: string): string {
  return `${slugify(name)}-${id}`;
}

export function createPromptSlug(id: number, name: string): string {
  return `${slugify(name)}-${id}`;
}

export function extractIdFromSlug(slug: string): number | null {
  const parts = slug.split('-');
  const id = parseInt(parts[parts.length - 1], 10);
  return isNaN(id) ? null : id;
}

/**
 * Creates a name-based slug for a tool. If there are duplicates,
 * the first one (by ID) gets the base slug, subsequent ones get -2, -3, etc.
 */
export function createToolSlugByName(name: string, tools: Tool[], toolId: number): string {
  const baseSlug = slugify(name);
  const duplicates = tools.filter(t => slugify(t.name) === baseSlug);

  if (duplicates.length <= 1) {
    return baseSlug;
  }

  // Sort by ID to ensure consistent ordering
  const sortedDuplicates = [...duplicates].sort((a, b) => a.id - b.id);
  const index = sortedDuplicates.findIndex(t => t.id === toolId);

  // First occurrence gets base slug, others get numbered suffix
  return index === 0 ? baseSlug : `${baseSlug}-${index + 1}`;
}

/**
 * Finds a tool by its slug from the tools array.
 * Handles both base slugs and numbered suffixes for duplicates.
 */
export function findToolBySlug(slug: string, tools: Tool[]): Tool | null {
  // First, check for numbered suffix pattern (e.g., "openclaw-2")
  const suffixMatch = slug.match(/^(.+)-(\d+)$/);

  if (suffixMatch) {
    const [, potentialBaseSlug, indexStr] = suffixMatch;
    const index = parseInt(indexStr, 10);

    // Check if this is actually a numbered duplicate (index >= 2)
    if (index >= 2) {
      const duplicates = tools.filter(t => slugify(t.name) === potentialBaseSlug);
      if (duplicates.length >= index) {
        const sortedDuplicates = [...duplicates].sort((a, b) => a.id - b.id);
        return sortedDuplicates[index - 1] || null;
      }
    }
  }

  // Try exact slug match (for base slugs or names that naturally end in numbers)
  const matchingTools = tools.filter(t => slugify(t.name) === slug);

  if (matchingTools.length > 0) {
    // Return the first one by ID (which would have the base slug)
    return [...matchingTools].sort((a, b) => a.id - b.id)[0];
  }

  return null;
}
