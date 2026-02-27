import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Use our own sw.js — just inject the precache manifest into it
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'sw.js',

      // Don't auto-inject registerSW.js — App.jsx handles SW registration
      injectRegister: null,

      // Don't auto-generate manifest.json — we have our own in public/
      manifest: false,

      // Include these static assets in precache
      includeAssets: ['favicon.ico', 'vite.svg', 'icons/*.png'],

      // Workbox options for injectManifest
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        globIgnores: ['**/node_modules/**/*'],
      },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: { vendor: ['react', 'react-dom'] },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
