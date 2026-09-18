import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../styles/theme';
import { store } from '../data/store';
import { planChanges } from '../services/progress-calculator';
import { formatRange } from '../utils/dates';
import { navigate } from '../router';

@customElement('import-page')
export class ImportPage extends LitElement {
  static styles = [baseStyles];
  @property({ type: Boolean }) fromOnboarding = false;

  render() {
    const state = store.get();
    const plan = state.pendingPlan;
    if (!plan) {
      return html`
        <section class="page">
          <div class="card">
            <h1 class="title">No plan waiting</h1>
            <p class="body">Import a JSON file from Settings or Sunday review.</p>
            <button class="btn primary block" style="margin-top:16px" @click=${() => navigate('settings')}>
              Go to settings
            </button>
          </div>
        </section>
      `;
    }

    const t = plan.targets;
    const gym = plan.schedule.filter((d) => d.type === 'gym').length;
    const changes = planChanges(state.activePlan, plan);

    return html`
      <section class="page">
        <div class="card">
          <p class="kicker">Ready</p>
          <h1 class="title">Week ${plan.week.number} ready</h1>
          <p class="body">${formatRange(plan.week.startDate, plan.week.endDate)}</p>
          <p class="body" style="margin-top:12px">Weight target: +${t.weeklyWeightGainKg.min}–${t.weeklyWeightGainKg.max} kg</p>
          <p class="body">Protein: ${t.proteinGrams} g</p>
          <p class="body">Gym: ${gym} sessions</p>
        </div>

        <div class="card stack">
          <p class="kicker">Changes</p>
          ${changes.map((change) => {
            if (change.from == null) return html`<p>${change.name} · ${change.to} kg</p>`;
            if (change.from === change.to) return html`<p>${change.name} unchanged</p>`;
            return html`<p>${change.name} ${change.from} → ${change.to} kg</p>`;
          })}
        </div>

        ${plan.coachNote
          ? html`<div class="card"><p class="kicker">Coach</p><p class="body">${plan.coachNote}</p></div>`
          : null}

        <button
          class="btn primary block"
          @click=${() => {
            store.startWeek();
            navigate('today');
          }}
        >
          Start week
        </button>
        <button
          class="btn ghost block"
          @click=${() => {
            store.setPendingPlan(null);
            navigate(this.fromOnboarding ? 'onboarding' : 'today');
          }}
        >
          Cancel
        </button>
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'import-page': ImportPage;
  }
}
