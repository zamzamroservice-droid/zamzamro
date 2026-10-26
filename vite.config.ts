import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // Keep the heavy 3D stack in its own lazily-loaded chunk.
        manualChunks(id) {
          if (/node_modules\/(three|@react-three|three-stdlib|troika|camera-controls|maath)/.test(id)) return 'three';
          if (/node_modules\/(motion|framer-motion|motion-dom|motion-utils)/.test(id)) return 'motion';
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) return 'react';
        },
      },
    },
  },
});
