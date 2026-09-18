/** Prefix public assets with Vite's base so GitHub Pages `/bulktrack/` works. */
export function publicUrl(path: string): string {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL || '/';
  const trimmed = path.replace(/^\.\//, '').replace(/^\//, '');
  return `${base}${trimmed}`;
}
