import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { publicUrl } from '../utils/assets';

@customElement('machine-image')
export class MachineImage extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .frame,
    img {
      width: 100%;
      aspect-ratio: 16 / 9;
      border-radius: inherit;
    }

    img {
      display: block;
      object-fit: cover;
      background: var(--surface-raised);
    }

    .frame {
      display: grid;
      place-items: center;
      background: var(--surface-raised);
      color: var(--text-secondary);
      font-size: 13px;
    }
  `;

  @property() src = '';
  @property() alt = '';
  @property({ type: Boolean }) placeholder = true;
  @state() private failed = false;
  @state() private resolved = '';

  willUpdate(changed: Map<string, unknown>): void {
    if (changed.has('src')) {
      this.failed = false;
      this.resolved = publicUrl(this.src);
    }
  }

  render() {
    const src = this.resolved || this.src;
    if (!this.src && !this.placeholder) return html``;
    if (!src || this.failed) {
      return html`<div class="frame">Machine image unavailable</div>`;
    }
    return html`<img
      src=${src}
      alt=${this.alt}
      @error=${() => {
        if (src.endsWith('.webp')) this.resolved = src.replace(/\.webp$/, '.png');
        else this.failed = true;
      }}
    />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'machine-image': MachineImage;
  }
}
