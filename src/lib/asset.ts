/**
 * Resolve a public asset path against Vite's base URL so it works both at the
 * site root (dev) and under a sub-path like /Portfolio_V2/ (GitHub Pages).
 * Accepts paths with or without a leading slash.
 */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '');
}
