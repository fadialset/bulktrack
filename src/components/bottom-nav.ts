import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { navigate, type AppPage } from '../router';

@customElement('bottom-nav')
export class BottomNav extends LitElement {
  @property() page: AppPage = 'today';

  static styles = css`
    :host {
      display: block;
    }

    nav {
      position: fixed;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      width: 100%;
      max-width: var(--max-width);
      height: var(--nav-h);
      padding: 8px 12px calc(10px + env(safe-area-inset-bottom, 0px));
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      background: rgba(11, 13, 16, 0.92);
      border-top: 1px solid var(--border);
      backdrop-filter: blur(16px);
    }

    button {
      min-height: 48px;
      border: 0;
      border-radius: 14px;
      background: transparent;
      color: var(--text-secondary);
      font-size: 13px;
      font-weight: 700;
    }

    button.on {
      color: var(--accent-ink);
      background: var(--accent);
    }
  `;

  render() {
    const items: Array<{ id: AppPage; label: string }> = [
      { id: 'today', label: 'Today' },
      { id: 'progress', label: 'Progress' },
      { id: 'plan', label: 'Plan' },
    ];
    return html`
      <nav>
        ${items.map(
          (item) => html`
            <button class=${this.page === item.id ? 'on' : ''} @click=${() => navigate(item.id)}>
              ${item.label}
            </button>
          `,
        )}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bottom-nav': BottomNav;
  }
}
