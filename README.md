# FinTax LK — Personal Finance & Tax Management

> Sri Lanka Personal Finance & Income Tax App  
> Covers **Y/A 2022/2023 → 2025/2026** · Act No. 24/2017 + Amendments through Act No. 02/2025  
> By **GDP Consultants (Pvt) Ltd** — Chartered Accountants, Negombo

---

## Features

- Multi-year IIT calculator (2022/23 split year through 2025/26)
- APIT calculator — Table 01 & Table 05 (IRD Sri Lanka)
- Cash Book — income/expense tracking, bank & cash
- Tax Report & Cash Book Report — HTML download → print to PDF
- EPF Planner, Net Worth, Loan Calculator, Rental Manager, Investment Tracker
- AI Tax Assistant (Sri Lanka tax questions)
- Google Drive backup & restore
- Subscription management with bank transfer + WhatsApp confirmation
- PWA — installable on Android & iOS, works offline
- Sinhala / Tamil / English

## Tax Year Data

| Year | Relief | Notes |
|------|--------|-------|
| 2022/2023 | Rs. 2,550,000 | Split year — IRA 2017 + Amdt 45/2022 |
| 2023/2024 | Rs. 1,200,000 | Amdt 45/2022 in full effect |
| 2024/2025 | Rs. 1,200,000 | Unchanged |
| 2025/2026 | Rs. 1,800,000 | Amdt 02/2025 — AIT 10%, 12% band removed |

## Quick Start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build
```

## Project Structure

```
fintaxlk/
├── index.html            # Vite entry (must be at root)
├── vite.config.js
├── package.json
├── .gitignore
├── src/
│   ├── App.jsx           # Entire application (~6800 lines)
│   ├── main.jsx          # React bootstrap
│   ├── index.css         # Global styles
│   └── App.css           # Print styles
└── public/
    ├── manifest.json     # PWA manifest
    ├── sw.js             # Service worker
    ├── favicon.ico
    ├── _headers          # Cloudflare security headers
    ├── _redirects        # SPA fallback → index.html
    └── icons/            # PWA icons 48px – 512px
```

## Deploy to Cloudflare Pages

1. Push this repo to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com) → **Create a project**
3. Connect your GitHub repo
4. Set build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** `20`
5. Click **Save and Deploy**

The `_redirects` file ensures all routes serve `index.html` (SPA routing).  
The `_headers` file sets security headers and cache policies.

---

**GDP Consultants (Pvt) Ltd**  
✉ gdpconsultants94@gmail.com  
🌐 https://gdpconsultants.lk  
💬 WhatsApp: +94 77 920 4903
