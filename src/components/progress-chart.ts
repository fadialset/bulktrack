import { LitElement, css, html, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { WeeklyMeasurement } from '../models/types';
import { formatShortDate } from '../utils/dates';

@customElement('progress-chart')
export class ProgressChart extends LitElement {
  @property({ attribute: false }) points: WeeklyMeasurement[] = [];

  static styles = css`
    :host {
      display: block;
    }

    svg {
      width: 100%;
      height: 180px;
    }

    .empty {
      height: 160px;
      display: grid;
      place-items: center;
      color: var(--text-secondary);
      font-size: 14px;
    }
  `;

  render() {
    const values = this.points.filter((p) => Number.isFinite(p.weightKg));
    if (values.length < 2) {
      return html`<div class="empty">${values.length ? 'Need one more weigh-in for a trend' : 'No weight history yet'}</div>`;
    }
    const weights = values.map((v) => v.weightKg);
    const min = Math.min(...weights) - 0.4;
    const max = Math.max(...weights) + 0.4;
    const w = 320;
    const h = 160;
    const pad = 18;
    const coords = values.map((point, i) => {
      const x = pad + (i / (values.length - 1)) * (w - pad * 2);
      const y = pad + ((max - point.weightKg) / (max - min || 1)) * (h - pad * 2);
      return { x, y, point };
    });
    const path = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ');
    const first = coords[0];
    const last = coords[coords.length - 1];
    return html`
      <svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Weight trend">
        ${svg`
          <path d=${path} fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          ${coords.map(
            (c) => svg`<circle cx=${c.x} cy=${c.y} r="4" fill="var(--accent)" />`,
          )}
        `}
        ${first
          ? html`<text x=${first.x} y=${h - 2} fill="#9299a3" font-size="10">${formatShortDate(first.point.date)}</text>`
          : null}
        ${last
          ? html`<text x=${last.x} y=${h - 2} fill="#9299a3" font-size="10" text-anchor="end">${formatShortDate(last.point.date)}</text>`
          : null}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'progress-chart': ProgressChart;
  }
}
