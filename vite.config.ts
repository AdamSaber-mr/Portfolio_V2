import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// `base` matches the GitHub Pages project path so assets resolve under /Portfolio_V2/.
// Disabling the modulepreload polyfill avoids an inline <script>, which keeps the
// strict Content-Security-Policy (script-src 'self') working without 'unsafe-inline'.
export default defineConfig({
  base: '/Portfolio_V2/',
  plugins: [react()],
  build: {
    modulePreload: { polyfill: false },
  },
});
