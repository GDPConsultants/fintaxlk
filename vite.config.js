import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    // Increase chunk size warning limit (App.jsx is large)
    chunkSizeWarningLimit: 3000,
  },
  // Ensure public assets (manifest, sw.js, icons) are served from root
  publicDir: ".",
  server: {
    port: 3000,
  },
});
