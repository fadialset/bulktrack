import type { Weekday } from '../models/types';

const WEEKDAYS: Weekday[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

const WEEKDAY_LABEL: Record<Weekday, string> = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
  sunday: 'Sun',
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function formatISODate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function parseISODate(value: string): Date {
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1);
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getMonday(date: Date): Date {
  const d = startOfDay(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  return addDays(d, diff);
}

export function todayISO(now = new Date()): string {
  return formatISODate(now);
}

export function weekdayKey(date: Date | string): Weekday {
  const d = typeof date === 'string' ? parseISODate(date) : date;
  return WEEKDAYS[d.getDay()] ?? 'monday';
}

export function weekdayLabel(day: Weekday): string {
  return WEEKDAY_LABEL[day];
}

export function formatLongDate(date: Date | string): string {
  const d = typeof date === 'string' ? parseISODate(date) : date;
  const weekday = d.toLocaleDateString('en-GB', { weekday: 'long' });
  return `${weekday}, ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

export function formatShortDate(date: Date | string): string {
  const d = typeof date === 'string' ? parseISODate(date) : date;
  return `${d.getDate()} ${MONTHS[d.getMonth()]?.slice(0, 3)}`;
}

export function formatRange(startISO: string, endISO: string): string {
  const start = parseISODate(startISO);
  const end = parseISODate(endISO);
  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()}–${end.getDate()} ${MONTHS[start.getMonth()]}`;
  }
  return `${start.getDate()} ${MONTHS[start.getMonth()]?.slice(0, 3)} – ${end.getDate()} ${MONTHS[end.getMonth()]?.slice(0, 3)}`;
}

export function formatMonth(monthKey: string): string {
  const [year, month] = monthKey.split('-').map(Number);
  const name = MONTHS[(month ?? 1) - 1] ?? monthKey;
  return `${name} ${year}`;
}

export function greeting(now = new Date()): string {
  const hour = now.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function weekDates(startISO: string): string[] {
  const start = parseISODate(startISO);
  return Array.from({ length: 7 }, (_, i) => formatISODate(addDays(start, i)));
}

export function inRange(dateISO: string, startISO: string, endISO: string): boolean {
  return dateISO >= startISO && dateISO <= endISO;
}

export function formatDuration(minutes: number): string {
  if (minutes < 1) return '<1 min';
  return `${Math.round(minutes)} min`;
}

export function formatTimer(seconds: number): string {
  const safe = Math.max(0, Math.ceil(seconds));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${pad(m)}:${pad(s)}`;
}

export function isFirstSundayOfMonth(dateISO: string): boolean {
  const d = parseISODate(dateISO);
  return d.getDay() === 0 && d.getDate() <= 7;
}

export function monthKey(dateISO: string): string {
  return dateISO.slice(0, 7);
}
