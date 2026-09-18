export function uid(prefix = 'id'): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function roundTo(n: number, step: number): number {
  const value = Math.round(n / step) * step;
  const digits = step < 1 ? String(step).split('.')[1]?.length ?? 1 : 0;
  return Number(value.toFixed(digits));
}

export function average(values: number[]): number | null {
  if (!values.length) return null;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function formatKg(n: number | null | undefined, digits = 1): string {
  if (n == null || Number.isNaN(n)) return '—';
  return `${n.toFixed(digits)} kg`;
}

export function formatCm(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return '—';
  return `${n.toFixed(1)} cm`;
}

export function formatSigned(n: number | null | undefined, unit: string, digits = 1): string {
  if (n == null || Number.isNaN(n)) return '—';
  const sign = n > 0 ? '+' : '';
  return `${sign}${n.toFixed(digits)} ${unit}`;
}

export function formatWeight(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export function parseNumber(value: string, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}
