import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// NOTE: vite-plugin-pwa removed — it was overwriting/corrupting our custom sw.js
// Our service worker (public/sw.js) is complete and handles caching, updates,
// push notifications and SKIP_WAITING manually. No workbox needed.

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
        manualChunks: { vendor: ['react', 'react-dom'] },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
