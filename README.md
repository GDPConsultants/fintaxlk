# FinTax LK v13 — Personal Finance & Tax Management

> Sri Lanka Income Tax (IIT) management PWA for the 2025/2026 assessment year  
> By **GDP Consultants — Chartered Accountants**

---

## 🚀 Quick Deploy (Cloudflare Pages)

1. Push this repo to GitHub
2. In Cloudflare Pages → **Connect to Git** → select this repo
3. Set build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Click **Save and Deploy** ✅

---

## 💻 Local Development

```bash
npm install
npm run dev          # → http://localhost:5173
```

## 🏗️ Production Build

```bash
npm run build        # outputs to dist/
npm run preview      # preview the dist build locally
```

---

## 📁 Project Structure

```
fintaxlk-v13/
├── index.html              ← Vite entry (at root)
├── package.json
├── vite.config.js
├── .gitignore
├── src/
│   ├── main.jsx            ← React entry point
│   └── App.jsx             ← FinTax LK v13 app (full source)
└── public/                 ← Static assets (copied to dist/ as-is)
    ├── manifest.json       ← PWA manifest
    ├── sw.js               ← Service worker
    ├── _redirects          ← Cloudflare SPA routing
    ├── _headers            ← Cloudflare security headers
    ├── icons/              ← PWA icons (72–512px)
    ├── android/
    │   ├── mipmap-mdpi/    ← 48px
    │   ├── mipmap-hdpi/    ← 72px
    │   ├── mipmap-xhdpi/   ← 96px
    │   ├── mipmap-xxhdpi/  ← 144px
    │   └── mipmap-xxxhdpi/ ← 192px
    └── ios/
        ├── 180.png         ← Apple Touch Icon
        └── 1024.png        ← App Store icon
```

---

## ✨ Features (v13)

- 📊 Dashboard with live tax summary
- 📅 Tax Year computation (IIT 2025/2026)
- 💰 Income Sources management
- 📄 Tax Report — professional HTML download (→ PDF)
- 📒 Cash Book — income & expense tracking
- 📥 Cash Book Report — professional HTML download (→ PDF)
- 🤖 AI Tools — Gemini-powered tax assistant
- 🛍️ Our Services — GDP Consultants offerings
- ☁️ Google Drive backup & restore
- 📲 PWA — installable on Android & iOS

---

## 📋 Tax Year

**2025/2026** — Sri Lanka Inland Revenue Department (IRD)  
Filing deadline: **30 November 2026**  
IRD Portal: [https://ird.gov.lk](https://ird.gov.lk)

---

*© 2025 GDP Consultants — Chartered Accountants. All rights reserved.*
