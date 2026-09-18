import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../styles/theme';
import { store } from '../data/store';
import { formatShortDate } from '../utils/dates';
import { navigate } from '../router';

@customElement('session-page')
export class SessionPage extends LitElement {
  static styles = [baseStyles];
  @property() sessionId = '';

  render() {
    const session = store.get().sessions.find((s) => s.id === this.sessionId);
    if (!session) {
      return html`
        <section class="page">
          <div class="card">
            <h1 class="title">Workout not found</h1>
            <button class="btn primary block" style="margin-top:16px" @click=${() => navigate('progress')}>
              Back
            </button>
          </div>
        </section>
      `;
    }
    return html`
      <section class="page">
        <button class="btn ghost" @click=${() => navigate('progress')}>← Progress</button>
        <div class="card">
          <p class="kicker">${formatShortDate(session.date)}</p>
          <h1 class="title">${session.name}</h1>
          <p class="body">${session.durationMinutes ? `${session.durationMinutes} min` : ''}</p>
          ${session.feeling ? html`<p class="body">Felt ${session.feeling.replace('_', ' ')}</p>` : null}
          ${session.notes ? html`<p class="body">${session.notes}</p>` : null}
        </div>
        ${session.exercises.map(
          (exercise) => html`
            <div class="card">
              <strong>${exercise.name}</strong>
              ${exercise.status === 'skipped'
                ? html`<p class="body">Skipped · machine unavailable</p>`
                : html`${exercise.plannedExerciseId !== exercise.performedExerciseId
                      ? html`<p class="body">Planned ${exercise.plannedExerciseId.replace(/_/g, ' ')}</p>`
                      : null}
                    ${exercise.sets
                      .filter((s) => s.done)
                      .map((s, i) => html`<p class="body">Set ${i + 1} · ${s.weightKg} kg × ${s.reps}</p>`)}`}
            </div>
          `,
        )}
      </section>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'session-page': SessionPage;
  }
}
