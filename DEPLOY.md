# FinTax LK — Deployment Guide

## Option A: GitHub Pages (Free)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "FinTax LK v13 — initial deploy"
git remote add origin https://github.com/YOUR_USERNAME/fintaxlk.git
git push -u origin main
```

### Step 2 — Enable GitHub Pages
1. Go to your GitHub repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` → folder: `/ (root)`
4. Click **Save**
5. Your app will be live at: `https://YOUR_USERNAME.github.io/fintaxlk`

> ⚠️ Note: `404.html` handles SPA routing on GitHub Pages.

---

## Option B: Cloudflare Pages (Recommended — Faster CDN)

### Step 1 — Connect repo
1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Click **Create a project** → **Connect to Git**
3. Authorize GitHub and select your repo

### Step 2 — Build settings
| Setting | Value |
|---------|-------|
| Framework preset | None |
| Build command | *(leave empty)* |
| Build output directory | `/` |
| Root directory | `/` |

### Step 3 — Deploy
- Click **Save and Deploy**
- Your app will be live at: `https://fintaxlk.pages.dev`

### Step 4 — Custom domain (optional)
1. In Cloudflare Pages → **Custom domains** → **Set up a custom domain**
2. Add: `app.taxcalculator.lk`
3. Follow DNS instructions

---

## PWABuilder — Package for Play Store

### Prerequisites
- App must be live on **HTTPS**
- All PWA requirements must pass (manifest ✅, service worker ✅, icons ✅)

### Steps
1. Go to **[https://www.pwabuilder.com](https://www.pwabuilder.com)**
2. Enter your live URL: `https://app.taxcalculator.lk`
3. Wait for analysis — you should see all green ✅
4. Click **Package for Stores**
5. Select **Android** → configure:
   - **App name:** FinTax LK
   - **Package ID:** `lk.taxcalculator.fintax`
   - **App version:** `1.3.0`
   - **Version code:** `13`
   - **Signing:** Generate a new key (save it securely!)
6. Click **Generate** → download `fintaxlk.zip`
7. Extract → upload `.aab` to Google Play Console

### Google Play Console
1. Go to [play.google.com/console](https://play.google.com/console)
2. Create app → **App type:** App → **Free**
3. Upload `.aab` → fill store listing
4. Submit for review (usually 3–5 days for new apps)

---

## Verify PWA Score

After deployment, check your score at:
- **[https://www.pwabuilder.com](https://www.pwabuilder.com)** — enter your URL
- **Chrome DevTools** → Lighthouse → Progressive Web App audit
- **[https://web.dev/measure](https://web.dev/measure)**

### Expected scores
| Check | Status |
|-------|--------|
| Web App Manifest | ✅ |
| Service Worker | ✅ |
| 512×512 maskable icon | ✅ |
| HTTPS | ✅ (GitHub Pages / Cloudflare) |
| Offline support | ✅ |
| Screenshots (mobile + desktop) | ✅ |
