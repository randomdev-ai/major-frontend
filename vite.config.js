import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      axios: fileURLToPath(new URL('./src/lib/axios.js', import.meta.url)),
    },
  },
});
