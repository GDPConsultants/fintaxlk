# FinTax LK v13

**Sri Lanka Personal Finance & Tax Management App**  
By GDP Consultants — Chartered Accountants

## Features
- 📊 IIT tax calculation (2025/2026 assessment year)
- 💵 Cash Book with income/expense tracking
- 📥 Download Tax Report & Cash Book Report (HTML → PDF)
- 🔄 Google Drive backup & restore
- 📱 PWA — installable on Android & iOS

## Quick Start

```bash
npm install
npm run dev        # localhost:3000
npm run build      # production build → dist/
```

## Deployment

### Cloudflare Pages
- Connect repo → build command: `npm run build` → output: `dist`

### Netlify
- Connect repo → build command: `npm run build` → publish: `dist`

## Project Structure

```
/
├── index.html              # HTML shell (PWA meta, SW registration)
├── manifest.json           # Web App Manifest
├── sw.js                   # Service Worker (offline / cache-first)
├── vite.config.js          # Vite build config
├── package.json
├── src/
│   ├── main.jsx            # React entry point
│   └── App.jsx             # FinTax LK v13 — full app
├── android/
│   ├── mipmap-mdpi/        # 48×48
│   ├── mipmap-hdpi/        # 72×72
│   ├── mipmap-xhdpi/       # 96×96
│   ├── mipmap-xxhdpi/      # 144×144
│   ├── mipmap-xxxhdpi/     # 192×192
│   └── playstore-icon.png  # 512×512
└── ios/
    ├── 180.png             # Apple Touch Icon (iPhone @3x)
    └── 1024.png            # App Store / iPad Pro icon
```

## Tax Year
**2025/2026** — Sri Lanka IIT, filing deadline 30 November 2026.

© GDP Consultants — Chartered Accountants
