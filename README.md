# FinTax LK v13.1 — Personal Finance & Tax Management

> Sri Lanka Income Tax (IIT) PWA for assessment years **2022/2023 – 2025/2026**  
> By **GDP Consultants — Chartered Accountants**

[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-F38020?logo=cloudflare)](https://pages.cloudflare.com)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8)](https://web.dev/progressive-web-apps/)
[![React 18](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev)
[![Vite 5](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev)

---

## 🚀 Quick Deploy — Cloudflare Pages

1. **Push this repo to GitHub**
2. In Cloudflare Pages → **Create application** → **Connect to Git** → select repo
3. Set build settings:

   | Setting | Value |
   |---------|-------|
   | Framework preset | `Vite` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Node version | `18` or `20` |

4. Click **Save and Deploy** ✅

> The `public/_redirects` and `public/_headers` files are automatically picked up  
> by Cloudflare Pages for SPA routing and security headers — no extra config needed.

---

## 💻 Local Development

```bash
npm install
npm run dev          # → http://localhost:5173
```

```bash
npm run build        # production build → dist/
npm run preview      # preview dist/ locally
```

---

## 📁 Project Structure

```
fintaxlk-v13/
├── index.html              ← Vite entry (OG tags, PWA meta, CSP)
├── package.json
├── vite.config.js          ← Vite + PWA injectManifest strategy
├── .gitignore
│
├── src/
│   ├── main.jsx            ← React entry point
│   ├── App.jsx             ← FinTax LK v13 — full app source (~6800 lines)
│   ├── index.css           ← Global reset + scrollbar styles
│   └── App.css             ← Print styles + safe-area utilities
│
└── public/                 ← Static assets (copied to dist/ as-is)
    ├── manifest.json       ← PWA web app manifest
    ├── sw.js               ← Service worker (cache-first / network-first)
    ├── _redirects          ← Cloudflare SPA routing (/* → /index.html 200)
    ├── _headers            ← Cloudflare security + cache headers
    │
    ├── icons/              ← Standard PWA icons (48 – 512px)
    │   ├── icon-48.png
    │   ├── icon-72.png
    │   ├── icon-96.png
    │   ├── icon-128.png
    │   ├── icon-144.png
    │   ├── icon-152.png
    │   ├── icon-192.png
    │   ├── icon-384.png
    │   └── icon-512.png
    │
    ├── android/
    │   ├── mipmap-mdpi/    ← 48px  ic_launcher.png
    │   ├── mipmap-hdpi/    ← 72px  ic_launcher.png
    │   ├── mipmap-xhdpi/   ← 96px  ic_launcher.png  (favicon)
    │   ├── mipmap-xxhdpi/  ← 144px ic_launcher.png
    │   ├── mipmap-xxxhdpi/ ← 192px ic_launcher.png
    │   └── playstore-icon.png  ← OG image / Play Store
    │
    └── ios/
        ├── 180.png         ← Apple Touch Icon (home screen)
        └── 1024.png        ← App Store / Spotlight icon
```

---

## ✨ Features (v13.1)

### Core
| Feature | Description |
|---------|-------------|
| 📊 Dashboard | Live tax summary card, net position, quick actions |
| 🗓️ Multi-Year | Tax calculations for Y/A 2022/23 · 2023/24 · 2024/25 · 2025/26 |
| 💰 Income Sources | Salary, freelance, rental, interest, dividend, export income |
| 📄 Tax Report | **Professional HTML download → PDF** (download fixed v13.1) |
| 📒 Cash Book | Full double-entry transaction ledger with running balance |
| 📥 Cash Book Report | **Professional HTML download → PDF** (download fixed v13.1) |
| 💼 Finance Report | Annual finance summary download |
| 🤖 AI Tax Assistant | Gemini-powered Sri Lanka tax Q&A |
| ☁️ Google Drive | Encrypted backup & restore |
| 📲 PWA | Installable on Android & iOS, offline-capable |

### Tax Computations (All years verified against IRD)
| Year | Personal Relief | Export Income | AIT on Interest | APIT Threshold |
|------|----------------|---------------|-----------------|----------------|
| 2022/23 | Rs. 2,550,000 | **EXEMPT** | 5–6% | Rs. 100,000–250,000/mo |
| 2023/24 | Rs. 1,200,000 | **EXEMPT** | 5% | Rs. 100,000/mo |
| 2024/25 | Rs. 1,200,000 | **EXEMPT** | 5% | Rs. 100,000/mo |
| 2025/26 | Rs. 1,800,000 | **15% flat** | 10% | Rs. 150,000/mo |

> Export/Service income exemption removed by **Amendment Act No. 02 of 2025** effective 01.04.2025

---

## 🔧 v13.1 Fix — Report Downloads

**Bug fixed:** All three report downloads (Tax Report, Cash Book Report, Finance Report)
were silently failing in Chrome due to the browser's ~2 MB limit on `data:` URI downloads.

**Root cause:** Used `data:text/html;charset=utf-8,` + `encodeURIComponent(html)`  
**Fix:** Replaced with `URL.createObjectURL(new Blob([html], {type:'text/html'}))` + `URL.revokeObjectURL()` after click.

---

## 📋 IRD References

- **Inland Revenue Act No. 24 of 2017** (base)
- **Amendment Act No. 45 of 2022** — new slabs from 01.10.2022
- **Amendment Act No. 02 of 2025** — changes from 01.04.2025
- Filing deadline: **30 November 2026**
- IRD e-Services portal: [https://ird.gov.lk](https://ird.gov.lk)

---

## 🔐 Security

- **CSP** meta tag restricts script/style/connect sources
- **`_headers`** enforces `X-Frame-Options: DENY`, `nosniff`, strict referrer
- **No analytics** — all data stored locally in IndexedDB (`localStorage` fallback)
- **Google Drive backup** uses OAuth 2.0 — no credentials stored in app

---

## 📞 Support

| Channel | Contact |
|---------|---------|
| 📧 Email | [gdpconsultantslk@gmail.com](mailto:gdpconsultantslk@gmail.com) |
| 💬 WhatsApp | +94 77 123 4567 |
| 🌐 Web | [gdpconsultants.lk](https://gdpconsultants.lk) |

---

*© 2025 GDP Consultants — Chartered Accountants. All rights reserved.*  
*FinTax LK is provided for informational purposes. Verify all figures with your tax advisor before IRD submission.*
