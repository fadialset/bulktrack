import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { clamp, formatWeight, parseNumber, roundTo } from '../utils/numbers';

@customElement('stepper-input')
export class StepperInput extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) step = 1;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 500;
  @property() suffix = '';

  static styles = css`
    :host {
      display: inline-flex;
    }

    .wrap {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: var(--surface-raised);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 4px;
      min-height: 44px;
    }

    button {
      width: 36px;
      height: 36px;
      border: 0;
      border-radius: 10px;
      background: var(--surface);
      color: var(--text-primary);
      font-size: 20px;
      font-weight: 700;
    }

    input {
      width: 52px;
      border: 0;
      background: transparent;
      color: var(--text-primary);
      text-align: center;
      font-size: 16px;
      font-weight: 700;
    }

    span {
      color: var(--text-secondary);
      font-size: 13px;
      padding-right: 8px;
    }
  `;

  private emit(next: number): void {
    const value = clamp(roundTo(next, this.step), this.min, this.max);
    this.value = value;
    this.dispatchEvent(new CustomEvent('change', { detail: value, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="wrap">
        <button type="button" @click=${() => this.emit(this.value - this.step)} aria-label="Decrease">−</button>
        <input
          type="text"
          inputmode="decimal"
          .value=${formatWeight(this.value)}
          @change=${(e: Event) => this.emit(parseNumber((e.target as HTMLInputElement).value, this.value))}
        />
        ${this.suffix ? html`<span>${this.suffix}</span>` : null}
        <button type="button" @click=${() => this.emit(this.value + this.step)} aria-label="Increase">+</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'stepper-input': StepperInput;
  }
}
