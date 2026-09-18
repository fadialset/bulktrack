import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { baseStyles } from '../styles/theme';
import { store } from '../data/store';
import {
  averageWeeklyChange,
  measurementsInRange,
  monthlyMeasurements,
  strengthProgress,
  totalWeightChange,
} from '../services/progress-calculator';
import { formatCm, formatKg, formatSigned } from '../utils/numbers';
import { formatMonth, formatShortDate } from '../utils/dates';
import { navigate } from '../router';
import type { PhotoPose, ProgressPhotoMeta, WeeklyMeasurement } from '../models/types';
import '../components/progress-chart';

@customElement('progress-page')
export class ProgressPage extends LitElement {
  static styles = [
    baseStyles,
    css`
      .compare {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }
      .compare img,
      .ph {
        width: 100%;
        aspect-ratio: 3/4;
        object-fit: cover;
        border-radius: 12px;
        background: var(--surface-raised);
      }
      .ph {
        display: grid;
        place-items: center;
        color: var(--text-secondary);
        font-size: 13px;
      }
    `,
  ];

  @state() private range: '1m' | '3m' | 'all' = '3m';
  @state() private showAllStrength = false;
  @state() private showHistory = false;
  @state() private urls: Record<string, string> = {};

  connectedCallback(): void {
    super.connectedCallback();
    void this.loadPhotos();
  }

  disconnectedCallback(): void {
    Object.values(this.urls).forEach((url) => URL.revokeObjectURL(url));
    super.disconnectedCallback();
  }

  private async loadPhotos(): Promise<void> {
    const next: Record<string, string> = {};
    for (const photo of store.get().photos) {
      const blob = await store.getPhoto(photo.id);
      if (blob) next[photo.id] = URL.createObjectURL(blob);
    }
    Object.values(this.urls).forEach((url) => URL.revokeObjectURL(url));
    this.urls = next;
  }

  render() {
    const state = store.get();
    const change = totalWeightChange(state);
    const weekly = averageWeeklyChange(state);
    const points = measurementsInRange(state, this.range);
    const monthly = monthlyMeasurements(state);
    const prev = monthly.at(-2);
    const latest = monthly.at(-1);
    const strength = strengthProgress(state);
    const visibleStrength = this.showAllStrength ? strength : strength.slice(0, 3);
    const history = state.sessions.filter((s) => s.completedAt);
    const photoMonths = [...new Set(state.photos.map((p) => p.month))].sort();
    const compareMonths = photoMonths.slice(-2);

    return html`
      <section class="page">
        <div class="card">
          <p class="kicker">Weight</p>
          <p class="metric">
            ${change.start != null ? formatKg(change.start) : '—'} → ${change.current != null ? formatKg(change.current) : '—'}
          </p>
          <p class="body">Goal: ${formatKg(state.profile?.targetWeightKg ?? state.activePlan?.targets.targetWeightKg)}</p>
          <p class="body">${change.delta != null ? formatSigned(change.delta, 'kg') + ' since start' : 'Log a Sunday weigh-in to start the trend.'}</p>
          ${weekly != null ? html`<p class="body">${formatSigned(weekly, 'kg')} / week average</p>` : null}
        </div>

        <div class="card">
          <div class="row">
            <p class="kicker">Trend</p>
            <div class="pill-row">
              ${(['1m', '3m', 'all'] as const).map(
                (id) => html`
                  <button class="pill ${this.range === id ? 'on' : ''}" @click=${() => (this.range = id)}>
                    ${id === '1m' ? '1 month' : id === '3m' ? '3 months' : 'All'}
                  </button>
                `,
              )}
            </div>
          </div>
          <progress-chart .points=${points}></progress-chart>
        </div>

        <div class="card stack">
          <p class="kicker">Body</p>
          ${latest
            ? html`
                <p class="body">${monthLabel(prev, latest)}</p>
                ${bodyRow('Upper arm', prev?.armCm, latest.armCm)}
                ${bodyRow('Waist', prev?.waistCm, latest.waistCm)}
                ${bodyRow('Chest', prev?.chestCm, latest.chestCm)}
                ${bodyRow('Shoulders', prev?.shouldersCm, latest.shouldersCm)}
                ${bodyRow('Forearm', prev?.forearmCm, latest.forearmCm)}
                ${bodyRow('Thigh', prev?.thighCm, latest.thighCm)}
              `
            : html`<p class="body">Monthly measurements appear after the first Sunday of a new month.</p>`}
        </div>

        <div class="card stack">
          <p class="kicker">Strength</p>
          ${visibleStrength.length
            ? visibleStrength.map(
                (card) => html`
                  <div class="row">
                    <span>${card.name}</span>
                    <strong>${card.fromKg} → ${card.toKg} kg</strong>
                  </div>
                `,
              )
            : html`<p class="body">Complete a workout to see strength changes.</p>`}
          ${strength.length > 3
            ? html`<button class="btn ghost" @click=${() => (this.showAllStrength = !this.showAllStrength)}>
                ${this.showAllStrength ? 'Show less' : 'View all exercises'}
              </button>`
            : null}
        </div>

        <div class="card stack">
          <p class="kicker">Progress photos</p>
          ${compareMonths.length
            ? html`
                <p class="body">${compareMonths.map(formatMonth).join(' ↔ ')}</p>
                ${(['front', 'side', 'back'] as const).map((pose) => this.poseCompare(pose, compareMonths, state.photos))}
              `
            : html`<p class="body">Front, side and back photos are added on the first Sunday of each month.</p>`}
        </div>

        <div class="card">
          <button class="btn ghost block" @click=${() => (this.showHistory = !this.showHistory)}>
            ${this.showHistory ? 'Hide workout history' : 'View workout history'}
          </button>
          ${this.showHistory
            ? history.map(
                (session) => html`
                  <button class="list-btn" @click=${() => navigate('history', session.id)}>
                    <span>
                      <strong>${session.name}</strong>
                      <span class="body" style="display:block">${formatShortDate(session.date)}</span>
                    </span>
                    <span class="muted">${session.durationMinutes ? `${session.durationMinutes} min` : ''}</span>
                  </button>
                `,
              )
            : null}
        </div>
      </section>
    `;
  }

  private poseCompare(pose: PhotoPose, months: string[], photos: ProgressPhotoMeta[]) {
    return html`
      <p>${pose[0]?.toUpperCase()}${pose.slice(1)}</p>
      <div class="compare">
        ${months.map((month) => {
          const photo = photos.find((p) => p.month === month && p.pose === pose);
          return photo && this.urls[photo.id]
            ? html`<img src=${this.urls[photo.id] ?? ''} alt=${`${pose} ${formatMonth(month)}`} />`
            : html`<div class="ph">${formatMonth(month)}</div>`;
        })}
      </div>
    `;
  }
}

function monthLabel(prev: WeeklyMeasurement | undefined, latest: WeeklyMeasurement): string {
  if (!prev) return formatMonth(latest.date.slice(0, 7));
  return `${formatMonth(prev.date.slice(0, 7))} → ${formatMonth(latest.date.slice(0, 7))}`;
}

function bodyRow(label: string, from: number | undefined, to: number | undefined) {
  if (from == null && to == null) return html``;
  const delta = from != null && to != null ? to - from : undefined;
  return html`
    <div class="row">
      <div>
        <p>${label}</p>
        <p class="body">${from != null && to != null ? `${formatCm(from)} → ${formatCm(to)}` : formatCm(to ?? from)}</p>
      </div>
      <strong>${delta != null ? formatSigned(delta, 'cm') : ''}</strong>
    </div>
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'progress-page': ProgressPage;
  }
}
