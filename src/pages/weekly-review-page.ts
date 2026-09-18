import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { baseStyles } from '../styles/theme';
import { store } from '../data/store';
import { monthlyMeasurements, weekStats, sortedMeasurements } from '../services/progress-calculator';
import { buildWeeklyExport, exportFilename } from '../services/weekly-export';
import { parseJsonFile } from '../services/weekly-import';
import { copyText, shareOrDownload } from '../utils/share';
import { isFirstSundayOfMonth, monthKey } from '../utils/dates';
import { navigate } from '../router';
import type { PhotoPose, WeekFeeling, WeeklyReview } from '../models/types';
import '../components/stepper-input';

@customElement('weekly-review-page')
export class WeeklyReviewPage extends LitElement {
  static styles = [
    baseStyles,
    css`
      .slots {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
      }
      .slot {
        display: grid;
        gap: 8px;
        justify-items: center;
        text-align: center;
      }
      .slot label {
        width: 100%;
        display: grid;
        place-items: center;
        background: var(--surface-raised);
        border: 1px dashed var(--border);
        color: var(--text-secondary);
        font-size: 13px;
        min-height: 44px;
        aspect-ratio: 3 / 4;
        border-radius: 12px;
      }
      .slot label:has(img) {
        border: 0;
        padding: 0;
        background: transparent;
        aspect-ratio: auto;
      }
      .slot img {
        width: 100%;
        aspect-ratio: 3 / 4;
        object-fit: cover;
        border-radius: 12px;
      }
    `,
  ];

  @state() private weightKg = 0;
  @state() private waistCm = 0;
  @state() private armCm = 0;
  @state() private chestCm = 0;
  @state() private shouldersCm = 0;
  @state() private forearmCm = 0;
  @state() private thighCm = 0;
  @state() private feeling: WeekFeeling | undefined;
  @state() private notes = '';
  @state() private message = '';
  @state() private error = '';
  @state() private ready = false;
  @state() private urls: Record<string, string> = {};
  @state() private monthlyDue = false;

  connectedCallback(): void {
    super.connectedCallback();
    const state = store.get();
    const last = sortedMeasurements(state).at(-1);
    const lastMonthly = monthlyMeasurements(state).at(-1);
    const plan = state.activePlan;
    const existing = plan ? state.reviews.find((r) => r.startDate === plan.week.startDate) : undefined;
    this.monthlyDue = plan ? isFirstSundayOfMonth(plan.week.endDate) : false;
    this.weightKg = existing?.measurements.weightKg ?? last?.weightKg ?? state.profile?.currentWeightKg ?? 0;
    this.waistCm = existing?.measurements.waistCm ?? lastMonthly?.waistCm ?? 0;
    this.armCm = existing?.measurements.armCm ?? lastMonthly?.armCm ?? 0;
    this.chestCm = existing?.measurements.chestCm ?? lastMonthly?.chestCm ?? 0;
    this.shouldersCm = existing?.measurements.shouldersCm ?? lastMonthly?.shouldersCm ?? 0;
    this.forearmCm = existing?.measurements.forearmCm ?? lastMonthly?.forearmCm ?? 0;
    this.thighCm = existing?.measurements.thighCm ?? lastMonthly?.thighCm ?? 0;
    this.feeling = existing?.weeklyFeeling;
    this.notes = existing?.userNotes ?? '';
    this.ready = true;
    void this.loadPhotos();
  }

  disconnectedCallback(): void {
    Object.values(this.urls).forEach((url) => URL.revokeObjectURL(url));
    super.disconnectedCallback();
  }

  private async loadPhotos(): Promise<void> {
    const month = store.get().activePlan ? monthKey(store.get().activePlan!.week.endDate) : '';
    const next: Record<string, string> = {};
    for (const photo of store.get().photos.filter((p) => p.month === month)) {
      const blob = await store.getPhoto(photo.id);
      if (blob) next[photo.id] = URL.createObjectURL(blob);
    }
    Object.values(this.urls).forEach((url) => URL.revokeObjectURL(url));
    this.urls = next;
  }

  private optional(n: number): number | undefined {
    return n > 0 ? n : undefined;
  }

  private review(): WeeklyReview | null {
    const plan = store.get().activePlan;
    if (!plan) return null;
    const monthly = this.monthlyDue
      ? {
          waistCm: this.optional(this.waistCm),
          armCm: this.optional(this.armCm),
          chestCm: this.optional(this.chestCm),
          shouldersCm: this.optional(this.shouldersCm),
          forearmCm: this.optional(this.forearmCm),
          thighCm: this.optional(this.thighCm),
        }
      : {};
    const monthlyRecorded = Boolean(
      this.monthlyDue &&
        (monthly.waistCm ||
          monthly.armCm ||
          monthly.chestCm ||
          monthly.shouldersCm ||
          monthly.forearmCm ||
          monthly.thighCm ||
          store.get().photos.some((p) => p.month === monthKey(plan.week.endDate))),
    );
    return {
      weekNumber: plan.week.number,
      startDate: plan.week.startDate,
      endDate: plan.week.endDate,
      completedAt: new Date().toISOString(),
      measurements: {
        date: plan.week.endDate,
        weightKg: this.weightKg,
        ...monthly,
      },
      monthlyRecorded,
      weeklyFeeling: this.feeling,
      userNotes: this.notes.trim() || undefined,
    };
  }

  private save(): WeeklyReview | null {
    const review = this.review();
    if (!review) return null;
    store.saveMeasurement(review.measurements);
    store.saveReview(review);
    return review;
  }

  private async exportJson(): Promise<void> {
    const review = this.save();
    if (!review) return;
    const payload = JSON.stringify(buildWeeklyExport(store.get(), review), null, 2);
    const result = await shareOrDownload(exportFilename(review.weekNumber), payload);
    store.markReviewExported(review.startDate);
    this.message = result === 'copied' ? 'JSON copied' : 'Review exported';
  }

  private async copyJson(): Promise<void> {
    const review = this.save();
    if (!review) return;
    await copyText(JSON.stringify(buildWeeklyExport(store.get(), review), null, 2));
    store.markReviewExported(review.startDate);
    this.message = 'JSON copied';
  }

  private async onImport(e: Event): Promise<void> {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const result = parseJsonFile(await file.text());
    if (!result.ok) {
      this.error = result.error;
      return;
    }
    this.save();
    store.setPendingPlan(result.plan);
    navigate('import');
  }

  private async onPhoto(pose: PhotoPose, e: Event): Promise<void> {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const date = store.get().activePlan?.week.endDate ?? undefined;
    await store.addPhoto(file, pose, date);
    await this.loadPhotos();
  }

  private photoFor(pose: PhotoPose) {
    const month = store.get().activePlan ? monthKey(store.get().activePlan!.week.endDate) : '';
    return store.get().photos.find((p) => p.month === month && p.pose === pose);
  }

  render() {
    const state = store.get();
    const plan = state.activePlan;
    if (!plan || !this.ready) {
      return html`<section class="page"><div class="card"><h1 class="title">No week to review</h1></div></section>`;
    }
    const stats = weekStats(state, plan.week.startDate, plan.week.endDate);

    return html`
      <section class="page">
        <div class="card">
          <p class="kicker">Sunday</p>
          <h1 class="title">Week ${plan.week.number} review</h1>
        </div>

        <div class="card stack">
          <p class="kicker">Measurements</p>
          <div class="field">
            <label>Weight</label>
            <stepper-input .value=${this.weightKg} .step=${0.1} suffix="kg" @change=${(e: CustomEvent<number>) => (this.weightKg = e.detail)}></stepper-input>
          </div>
        </div>

        ${this.monthlyDue ? this.monthlySection() : null}

        <div class="card stack">
          <p class="kicker">This week</p>
          <p>Training ${stats.completedSessions} / ${stats.plannedSessions} workouts ${stats.completedSessions >= stats.plannedSessions && stats.plannedSessions ? '✓' : ''}</p>
          <p>Food adherence ${stats.adherence.foodDaysOnPlan} / 7 days</p>
          <p>Creatine ${stats.adherence.creatineDays} / 7 days</p>
          <p>Average sleep ${stats.averageSleep != null ? `${stats.averageSleep} h` : '—'}</p>
        </div>

        <div class="card stack">
          <p>How did this week feel?</p>
          <div class="split">
            ${(['easy', 'good', 'hard'] as const).map(
              (id) => html`<button class="choice ${this.feeling === id ? 'on' : ''}" @click=${() => (this.feeling = id)}>${id}</button>`,
            )}
          </div>
          <div class="field">
            <label>Anything I should know?</label>
            <textarea
              placeholder="Shoulder felt slightly uncomfortable Thursday. Food was good except Saturday."
              .value=${this.notes}
              @input=${(e: Event) => (this.notes = (e.target as HTMLTextAreaElement).value)}
            ></textarea>
          </div>
        </div>

        ${this.message ? html`<p class="body">${this.message}</p>` : null}
        ${this.error ? html`<p class="error">${this.error}</p>` : null}

        <button class="btn primary block" @click=${() => this.exportJson()}>Export for ChatGPT</button>
        <button class="btn secondary block" @click=${() => this.copyJson()}>Copy JSON</button>
        <label class="btn ghost block" style="display:grid;place-items:center">
          Import next week
          <input type="file" accept="application/json" hidden @change=${this.onImport} />
        </label>
      </section>
    `;
  }

  private monthlySection() {
    return html`
      <div class="card stack">
        <p class="kicker">Monthly progress</p>
        <p class="body">Weight ${this.weightKg.toFixed(1)} kg</p>
        <div class="field"><label>Waist</label><stepper-input .value=${this.waistCm} .step=${0.1} suffix="cm" @change=${(e: CustomEvent<number>) => (this.waistCm = e.detail)}></stepper-input></div>
        <div class="field"><label>Upper arm</label><stepper-input .value=${this.armCm} .step=${0.1} suffix="cm" @change=${(e: CustomEvent<number>) => (this.armCm = e.detail)}></stepper-input></div>
        <div class="field"><label>Chest</label><stepper-input .value=${this.chestCm} .step=${0.1} suffix="cm" @change=${(e: CustomEvent<number>) => (this.chestCm = e.detail)}></stepper-input></div>
        <div class="field"><label>Shoulders</label><stepper-input .value=${this.shouldersCm} .step=${0.1} suffix="cm" @change=${(e: CustomEvent<number>) => (this.shouldersCm = e.detail)}></stepper-input></div>
        <div class="field"><label>Forearm</label><stepper-input .value=${this.forearmCm} .step=${0.1} suffix="cm" @change=${(e: CustomEvent<number>) => (this.forearmCm = e.detail)}></stepper-input></div>
        <div class="field"><label>Thigh</label><stepper-input .value=${this.thighCm} .step=${0.1} suffix="cm" @change=${(e: CustomEvent<number>) => (this.thighCm = e.detail)}></stepper-input></div>
      </div>
      <div class="card stack">
        <p class="kicker">Progress photos</p>
        <div class="slots">
          ${this.photoSlot('front', 'Front')}
          ${this.photoSlot('side', 'Side')}
          ${this.photoSlot('back', 'Back')}
        </div>
      </div>
    `;
  }

  private photoSlot(pose: PhotoPose, label: string) {
    const photo = this.photoFor(pose);
    return html`
      <div class="slot">
        <span class="body">${label}</span>
        ${photo && this.urls[photo.id]
          ? html`<label>
              <img src=${this.urls[photo.id] ?? ''} alt=${label} />
              <input type="file" accept="image/*" hidden @change=${(e: Event) => this.onPhoto(pose, e)} />
            </label>`
          : html`<label>Add
              <input type="file" accept="image/*" hidden @change=${(e: Event) => this.onPhoto(pose, e)} />
            </label>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'weekly-review-page': WeeklyReviewPage;
  }
}
