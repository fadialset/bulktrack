import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { baseStyles } from '../styles/theme';
import { store } from '../data/store';
import { parseJsonFile } from '../services/weekly-import';
import { APP_VERSION, emptyState, type AppBackup, type AppState } from '../models/types';
import { copyText, downloadTextFile } from '../utils/share';
import { photoGet, photoPut } from '../data/database';
import { navigate } from '../router';
import '../components/stepper-input';

@customElement('settings-page')
export class SettingsPage extends LitElement {
  static styles = [baseStyles];
  @state() private message = '';
  @state() private error = '';

  private async importPlan(e: Event): Promise<void> {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const result = parseJsonFile(await file.text());
    if (!result.ok) {
      this.error = result.error;
      return;
    }
    store.setPendingPlan(result.plan);
    navigate('import');
  }

  private async exportAll(): Promise<void> {
    const state = store.get();
    const photos: AppBackup['photos'] = [];
    for (const photo of state.photos) {
      const blob = await photoGet(photo.id);
      if (!blob) continue;
      const dataUrl = await blobToDataUrl(blob);
      photos.push({ id: photo.id, mime: blob.type || 'image/jpeg', dataUrl });
    }
    const backup: AppBackup = {
      schemaVersion: 2,
      type: 'bulkTrackBackup',
      exportedAt: new Date().toISOString(),
      state,
      photos,
    };
    const json = JSON.stringify(backup, null, 2);
    try {
      downloadTextFile('bulktrack-backup.json', json);
      this.message = 'Backup downloaded';
    } catch {
      await copyText(json);
      this.message = 'Backup copied';
    }
  }

  private async importBackup(e: Event): Promise<void> {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text()) as AppBackup;
      if (parsed.schemaVersion !== 2 || parsed.type !== 'bulkTrackBackup' || !parsed.state) {
        this.error = 'That is not a BulkTrack V2 backup.';
        return;
      }
      const state: AppState = { ...emptyState(), ...parsed.state, schemaVersion: 2 };
      store.restoreBackup(state);
      for (const photo of parsed.photos ?? []) {
        const blob = dataUrlToBlob(photo.dataUrl);
        if (blob) await photoPut(photo.id, blob);
      }
      this.message = 'Backup imported';
    } catch {
      this.error = 'Could not read that backup file.';
    }
  }

  render() {
    const profile = store.get().profile;
    return html`
      <section class="page">
        <div class="card stack">
          <p class="kicker">Profile</p>
          <div class="field">
            <label>Height</label>
            <stepper-input
              .value=${profile?.heightCm ?? 168}
              .step=${1}
              suffix="cm"
              @change=${(e: CustomEvent<number>) => store.updateProfile({ heightCm: e.detail })}
            ></stepper-input>
          </div>
          <div class="field">
            <label>Target weight</label>
            <stepper-input
              .value=${profile?.targetWeightKg ?? 72}
              .step=${0.1}
              suffix="kg"
              @change=${(e: CustomEvent<number>) => store.updateProfile({ targetWeightKg: e.detail })}
            ></stepper-input>
          </div>
        </div>

        <div class="card stack">
          <p class="kicker">Units</p>
          <p>kg / cm</p>
        </div>

        <div class="card stack">
          <p class="kicker">Weekly plan</p>
          <label class="btn primary block" style="display:grid;place-items:center">
            Import plan JSON
            <input type="file" accept="application/json" hidden @change=${this.importPlan} />
          </label>
        </div>

        <div class="card stack">
          <p class="kicker">Data</p>
          <button class="btn secondary block" @click=${() => this.exportAll()}>Export all data</button>
          <label class="btn secondary block" style="display:grid;place-items:center">
            Import backup
            <input type="file" accept="application/json" hidden @change=${this.importBackup} />
          </label>
          <button class="btn danger block" @click=${() => confirm('Reset BulkTrack on this device?') && store.reset()}>
            Reset app
          </button>
        </div>

        ${this.message ? html`<p class="body">${this.message}</p>` : null}
        ${this.error ? html`<p class="error">${this.error}</p>` : null}

        <div class="card">
          <p class="kicker">About</p>
          <p>BulkTrack ${APP_VERSION}</p>
          <p class="body">Personal weekly tracker. ChatGPT is the coach.</p>
        </div>
      </section>
    `;
  }
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function dataUrlToBlob(dataUrl: string): Blob | null {
  const [header, body] = dataUrl.split(',');
  if (!body) return null;
  const mime = header?.match(/data:(.*?);/)?.[1] ?? 'image/jpeg';
  const binary = atob(body);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

declare global {
  interface HTMLElementTagNameMap {
    'settings-page': SettingsPage;
  }
}
