import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { baseStyles } from '../styles/theme';
import { store } from '../data/store';
import { createDemoPlan } from '../data/demo-plan';
import { parseJsonFile } from '../services/weekly-import';
import { navigate } from '../router';
import type { WeeklyPlan } from '../models/types';
import '../components/stepper-input';

@customElement('onboarding-page')
export class OnboardingPage extends LitElement {
  static styles = [
    baseStyles,
    css`
      .actions {
        position: sticky;
        bottom: 0;
        display: grid;
        gap: 8px;
        padding: 8px 0 12px;
        background: linear-gradient(to top, var(--bg) 70%, transparent);
      }
    `,
  ];

  @state() private heightCm = 168;
  @state() private currentWeightKg = 65.5;
  @state() private targetWeightKg = 72;
  @state() private error = '';

  private finish(plan: WeeklyPlan | null): void {
    store.completeOnboarding(
      {
        heightCm: this.heightCm,
        currentWeightKg: this.currentWeightKg,
        targetWeightKg: this.targetWeightKg,
        goal: 'lean_bulk',
      },
      plan,
    );
    navigate('today');
  }

  private async onFile(e: Event): Promise<void> {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const text = await file.text();
    const result = parseJsonFile(text);
    if (!result.ok) {
      this.error = result.error;
      return;
    }
    store.completeOnboarding(
      {
        heightCm: this.heightCm,
        currentWeightKg: this.currentWeightKg,
        targetWeightKg: result.plan.targets.targetWeightKg,
        goal: 'lean_bulk',
      },
      null,
    );
    store.setPendingPlan(result.plan);
    navigate('import');
  }

  render() {
    return html`
      <section class="page">
        <div class="card stack">
          <p class="kicker">Welcome</p>
          <h1 class="title">Welcome to BulkTrack</h1>
          <p class="body">A simple fitness tracker built around your weekly plan.</p>
          <div class="field">
            <label>Height</label>
            <stepper-input
              .value=${this.heightCm}
              .step=${1}
              suffix="cm"
              @change=${(e: CustomEvent<number>) => (this.heightCm = e.detail)}
            ></stepper-input>
          </div>
          <div class="field">
            <label>Current weight</label>
            <stepper-input
              .value=${this.currentWeightKg}
              .step=${0.1}
              suffix="kg"
              @change=${(e: CustomEvent<number>) => (this.currentWeightKg = e.detail)}
            ></stepper-input>
          </div>
          <div class="field">
            <label>Target weight</label>
            <stepper-input
              .value=${this.targetWeightKg}
              .step=${0.1}
              suffix="kg"
              @change=${(e: CustomEvent<number>) => (this.targetWeightKg = e.detail)}
            ></stepper-input>
          </div>
        </div>

        ${this.error ? html`<p class="error">${this.error}</p>` : null}

        <div class="actions">
          <button class="btn primary block" @click=${() => this.finish(createDemoPlan())}>
            Use demo plan
          </button>
          <label class="btn secondary block" style="display:grid;place-items:center">
            Import plan
            <input type="file" accept="application/json" hidden @change=${this.onFile} />
          </label>
        </div>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'onboarding-page': OnboardingPage;
  }
}
