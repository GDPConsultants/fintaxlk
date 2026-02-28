# FinTax LK — Personal Finance & Tax Management

> Sri Lanka Personal Finance & Income Tax Management App  
> Built for the **Inland Revenue Act No. 24 of 2017** and all amendments through **Act No. 02 of 2025**  
> By **GDP Consultants (Pvt) Ltd** — Chartered Accountants, Negombo

---

## 🚀 Features

- **Multi-Year Tax Calculator** — Y/A 2022/2023 (split year), 2023/2024, 2024/2025, 2025/2026
- **IIT / APIT Calculator** — Table 01 & Table 05 methods per IRD tables
- **Cash Book** — Income & expense tracking with bank/cash split
- **Tax Report & Cash Book Report** — Professional HTML download (print to PDF)
- **Subscription Management** — Trial → paid flow with bank transfer + WhatsApp confirmation
- **Admin Panel** — Pricing control, subscriber activation/deactivation
- **Google Drive Backup & Restore** — Per-user data backup to own Drive
- **Multi-language** — English, Sinhala, Tamil
- **PWA** — Installable on Android & iOS, works offline

---

## 📋 Tax Year Coverage

| Year | Personal Relief | Key Change |
|------|----------------|------------|
| 2022/2023 | Rs. 2,550,000 (split) | Split year: IRA 2017 (Apr–Dec) + Amdt 45/2022 (Jan–Mar) |
| 2023/2024 | Rs. 1,200,000 | Amendment Act No. 45/2022 fully in effect |
| 2024/2025 | Rs. 1,200,000 | IRD Compliance Ruling 2024/01 (Transfer Pricing) |
| 2025/2026 | Rs. 1,800,000 | Amendment Act No. 02/2025 — 12% band eliminated, AIT 10% |

---

## 🛠️ Tech Stack

- **React 18** + Vite 5
- **Single-file SPA** — all logic in `src/App.jsx`
- **PWA** — Service Worker + Web App Manifest
- **Storage** — `localStorage` (device-local, no server)
- **Deployment** — Cloudflare Pages

---

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
fintaxlk/
├── index.html              # Entry HTML (Vite root)
├── vite.config.js          # Vite + PWA config
├── package.json
├── .gitignore
├── src/
│   ├── App.jsx             # Main application (single file)
│   ├── main.jsx            # React entry point
│   ├── App.css             # Component styles
│   └── index.css           # Global styles
└── public/
    ├── manifest.json       # PWA manifest
    ├── sw.js               # Service worker
    ├── favicon.ico
    ├── vite.svg
    ├── _headers            # Cloudflare Pages headers
    ├── _redirects          # Cloudflare Pages SPA redirect
    └── icons/              # PWA icons (72–512px)
```

---

## 🌐 Deployment (Cloudflare Pages)

1. Push to GitHub
2. Connect repo in Cloudflare Pages dashboard
3. Set build command: `npm run build`
4. Set build output directory: `dist`
5. Deploy

The `public/_headers` and `public/_redirects` files handle:
- SPA routing (all paths → `/index.html`)
- Security headers (CSP, HSTS, X-Frame-Options)

---

## 📜 Legal & Compliance

All tax rates, personal relief amounts, APIT tables and rules are sourced from:
- Inland Revenue Act No. 24 of 2017
- Amendment Act No. 45 of 2022 (effective 01.01.2023)
- Amendment Act No. 04 of 2023
- Amendment Act No. 02 of 2025 (effective 01.04.2025)
- IRD Notices: PN/IT/2022-03, PN/IT/2025-01

**For professional tax advice, contact GDP Consultants.**

---

## 📞 Contact

**GDP Consultants (Pvt) Ltd**  
Chartered Accountants & Tax Advisors  
📧 gdpconsultants94@gmail.com  
🌐 https://gdpconsultants.lk  
💬 WhatsApp: +94 77 123 4567

---

*FinTax LK v1.3.0 · February 2026*
