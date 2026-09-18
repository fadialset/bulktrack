export type AppPage =
  | 'today'
  | 'progress'
  | 'plan'
  | 'settings'
  | 'workout'
  | 'review'
  | 'onboarding'
  | 'history'
  | 'import';

export interface RouteState {
  page: AppPage;
  workoutId?: string;
  sessionId?: string;
}

const MAIN: AppPage[] = ['today', 'progress', 'plan'];

export function parseHash(hash = window.location.hash): RouteState {
  const raw = hash.replace(/^#\/?/, '');
  const [page, a] = raw.split('/');
  if (page === 'plan' && a) return { page: 'plan', workoutId: a };
  if (page === 'history' && a) return { page: 'history', sessionId: a };
  const allowed: AppPage[] = [
    'today',
    'progress',
    'plan',
    'settings',
    'workout',
    'review',
    'onboarding',
    'history',
    'import',
  ];
  if (allowed.includes(page as AppPage)) return { page: page as AppPage };
  return { page: 'today' };
}

export function navigate(page: AppPage, extra = ''): void {
  const path = extra ? `#/${page}/${extra}` : `#/${page}`;
  if (window.location.hash === path) {
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    return;
  }
  window.location.hash = path;
}

export function isMainPage(page: AppPage): boolean {
  return MAIN.includes(page);
}
