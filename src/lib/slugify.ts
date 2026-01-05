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
