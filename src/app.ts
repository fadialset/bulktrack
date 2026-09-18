import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { store } from './data/store';
import { isMainPage, parseHash, type RouteState } from './router';
import './components/app-header';
import './components/bottom-nav';
import './pages/today-page';
import './pages/progress-page';
import './pages/plan-page';
import './pages/settings-page';
import './pages/workout-page';
import './pages/weekly-review-page';
import './pages/onboarding-page';
import './pages/import-page';
import './pages/session-page';

@customElement('bulk-app')
export class BulkApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100dvh;
      background: var(--bg);
    }

    .shell {
      max-width: var(--max-width);
      margin: 0 auto;
      min-height: 100dvh;
      max-height: 100dvh;
      overflow-y: auto;
      padding-bottom: calc(var(--nav-h) + 16px);
    }

    .shell.full {
      padding-bottom: 24px;
    }

    main {
      padding: 0 20px 24px;
    }
  `;

  @state() private route: RouteState = { page: 'today' };
  @state() private ready = false;

  connectedCallback(): void {
    super.connectedCallback();
    store.ready = store.init().then(() => {
      this.ready = true;
      this.syncRoute();
    });
    window.addEventListener('hashchange', this.syncRoute);
    store.subscribe(() => this.requestUpdate());
    if (!window.location.hash) window.location.hash = '#/today';
  }

  disconnectedCallback(): void {
    window.removeEventListener('hashchange', this.syncRoute);
    super.disconnectedCallback();
  }

  private syncRoute = () => {
    this.route = parseHash();
  };

  private header() {
    const page = this.effectivePage();
    if (page === 'onboarding') return html`<app-header title="BulkTrack" .showSettings=${false}></app-header>`;
    if (page === 'workout') return null;
    if (page === 'review') return html`<app-header title="Review" backTo="today"></app-header>`;
    if (page === 'settings') return html`<app-header title="Settings" backTo="today" .showSettings=${false}></app-header>`;
    if (page === 'import') return html`<app-header title="Import" backTo="today" .showSettings=${false}></app-header>`;
    if (page === 'history') return html`<app-header title="Workout" backTo="progress" .showSettings=${false}></app-header>`;
    if (page === 'today') return html`<app-header title="BulkTrack" .showDate=${true}></app-header>`;
    if (page === 'progress') return html`<app-header title="Progress"></app-header>`;
    return html`<app-header title="Plan"></app-header>`;
  }

  private effectivePage() {
    const state = store.get();
    if (!state.onboardingComplete) return 'onboarding' as const;
    return this.route.page;
  }

  render() {
    if (!this.ready) {
      return html`<div class="shell"><main><p style="padding:24px;color:var(--text-secondary)">Loading…</p></main></div>`;
    }

    const page = this.effectivePage();
    const main = isMainPage(page);

    return html`
      <div class="shell ${main ? '' : 'full'}">
        ${this.header()}
        <main>
          ${page === 'today' ? html`<today-page></today-page>` : null}
          ${page === 'progress' ? html`<progress-page></progress-page>` : null}
          ${page === 'plan' ? html`<plan-page .workoutId=${this.route.workoutId ?? ''}></plan-page>` : null}
          ${page === 'settings' ? html`<settings-page></settings-page>` : null}
          ${page === 'workout' ? html`<workout-page></workout-page>` : null}
          ${page === 'review' ? html`<weekly-review-page></weekly-review-page>` : null}
          ${page === 'onboarding' ? html`<onboarding-page></onboarding-page>` : null}
          ${page === 'import' ? html`<import-page></import-page>` : null}
          ${page === 'history' ? html`<session-page .sessionId=${this.route.sessionId ?? ''}></session-page>` : null}
        </main>
        ${main ? html`<bottom-nav .page=${page}></bottom-nav>` : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bulk-app': BulkApp;
  }
}
