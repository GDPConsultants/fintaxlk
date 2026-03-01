import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// NOTE: vite-plugin-pwa is NOT used for service worker generation.
// App.jsx registers /sw.js directly via navigator.serviceWorker.register('/sw.js').
// public/sw.js  → served as-is by Cloudflare Pages (no Workbox injection needed).
// public/manifest.json → served directly, no auto-generation required.

export default defineConfig({
  plugins: [
    react(),
  ],

  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },

  server: {
    port: 5173,
  },
});
