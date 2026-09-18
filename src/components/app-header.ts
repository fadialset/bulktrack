import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { formatLongDate, greeting, todayISO } from '../utils/dates';
import { navigate, type AppPage } from '../router';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property() title = 'BulkTrack';
  @property({ type: Boolean }) showDate = false;
  @property({ type: Boolean }) showSettings = true;
  @property() backTo: AppPage | '' = '';

  static styles = css`
    :host {
      display: block;
    }

    header {
      min-height: var(--header-h);
      padding: calc(10px + env(safe-area-inset-top, 0px)) 20px 8px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }

    .brand {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-height: 44px;
      justify-content: center;
    }

    .top {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .name {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: -0.03em;
    }

    .date {
      font-size: 13px;
      color: var(--text-secondary);
    }

    .hello {
      font-size: 12px;
      color: var(--text-secondary);
    }

    button {
      width: 44px;
      height: 44px;
      border: 0;
      border-radius: 12px;
      background: var(--surface);
      color: var(--text-primary);
      font-size: 18px;
      flex-shrink: 0;
    }
  `;

  render() {
    return html`
      <header>
        <div class="brand">
          <div class="top">
            ${this.backTo
              ? html`<button @click=${() => navigate(this.backTo as AppPage)} aria-label="Back">←</button>`
              : null}
            <span class="name">${this.title}</span>
          </div>
          ${this.showDate ? html`<span class="date">${formatLongDate(todayISO())}</span>` : null}
          ${this.showDate ? html`<span class="hello">${greeting()}</span>` : null}
        </div>
        ${this.showSettings
          ? html`<button @click=${() => navigate('settings')} aria-label="Settings">⚙</button>`
          : html`<span></span>`}
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-header': AppHeader;
  }
}
