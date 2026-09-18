import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: block;
    color: var(--text-primary);
  }

  * {
    box-sizing: border-box;
  }

  button,
  input,
  textarea {
    font-family: inherit;
  }

  .page {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    box-shadow: var(--shadow);
  }

  .card.raised {
    background: var(--surface-raised);
  }

  .kicker {
    margin: 0 0 6px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .muted {
    color: var(--text-secondary);
  }

  h1,
  h2,
  h3,
  p {
    margin: 0;
  }

  .title {
    font-size: 28px;
    line-height: 1.15;
    font-weight: 700;
    letter-spacing: -0.03em;
  }

  .metric {
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.04em;
  }

  .body {
    font-size: 15px;
    line-height: 1.45;
    color: var(--text-secondary);
  }

  .meta {
    font-size: 13px;
    color: var(--text-secondary);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .btn {
    min-height: 48px;
    border: 0;
    border-radius: 14px;
    padding: 0 18px;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.01em;
  }

  .btn.primary {
    background: var(--accent);
    color: var(--accent-ink);
  }

  .btn.secondary {
    background: var(--surface-raised);
    color: var(--text-primary);
    border: 1px solid var(--border);
  }

  .btn.ghost {
    background: transparent;
    color: var(--text-secondary);
  }

  .btn.danger {
    background: rgba(255, 92, 92, 0.12);
    color: var(--danger);
  }

  .btn.block {
    width: 100%;
  }

  .btn:disabled {
    opacity: 0.45;
  }

  .choice {
    min-height: 48px;
    flex: 1;
    border: 1px solid var(--border);
    border-radius: 14px;
    background: var(--surface-raised);
    color: var(--text-primary);
    font-weight: 700;
  }

  .choice.on {
    background: var(--accent);
    color: var(--accent-ink);
    border-color: transparent;
  }

  .habit {
    width: 100%;
    min-height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 0 4px;
    border: 0;
    background: transparent;
    color: inherit;
    font-size: 16px;
  }

  .check {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1.5px solid var(--border);
    display: grid;
    place-items: center;
    color: var(--accent-ink);
    font-size: 14px;
    font-weight: 800;
  }

  .check.on {
    background: var(--accent);
    border-color: var(--accent);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .field label {
    font-size: 13px;
    color: var(--text-secondary);
  }

  .field input,
  .field textarea {
    width: 100%;
    min-height: 48px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--surface-raised);
    color: var(--text-primary);
    padding: 12px 14px;
  }

  .field textarea {
    min-height: 120px;
    resize: vertical;
  }

  .pill-row,
  .split {
    display: flex;
    gap: 8px;
  }

  .pill {
    min-height: 36px;
    padding: 0 12px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-secondary);
    font-weight: 600;
    font-size: 13px;
  }

  .pill.on {
    background: var(--accent);
    color: var(--accent-ink);
    border-color: transparent;
  }

  .list-btn {
    width: 100%;
    min-height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 0;
    border: 0;
    border-bottom: 1px solid var(--border);
    background: transparent;
    color: inherit;
    text-align: left;
  }

  .list-btn:last-child {
    border-bottom: 0;
  }

  .error {
    color: var(--danger);
    font-size: 14px;
  }
`;
