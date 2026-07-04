/**
 * normalizes a string for case-insensitive, whitespace-agnostic searching
 */
export function normalize(str?: string): string {
  if (!str) return '';
  return str.trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Checks if a normalized text includes a normalized query
 */
export function fuzzyIncludes(text: string, query: string): boolean {
  if (!query) return true;
  if (!text) return false;
  return text.includes(query);
}

/**
 * Checks if a normalized text starts with a normalized query
 */
export function fuzzyStartsWith(text: string, query: string): boolean {
  if (!query) return true;
  if (!text) return false;
  return text.startsWith(query);
}
