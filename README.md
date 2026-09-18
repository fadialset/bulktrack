# BulkTrack

Personal weekly fitness tracker for one person.

**Today → train/log it → close the app.**

Once a week: Sunday review → export JSON → ChatGPT → import next week.

Local-only. Data lives in IndexedDB on this device.

## Run

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`.

## GitHub Pages

The live app is the Vite `dist` output, not the source files. Pushing `main` builds and deploys via GitHub Actions.

In the repo: **Settings → Pages → Source → GitHub Actions**.

App URL: `https://fadialset.github.io/bulktrack/`

## Install on your phone

```bash
npm run build
npm run preview
```

1. On **iPhone**: Safari → Share → **Add to Home Screen**
2. On **Android**: Chrome menu → **Install app**

## Weekly loop

The sample next-week plan is at `public/sample-weekly-plan.json`.
