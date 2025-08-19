import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'source'), // Point @ to source folder now
      '@/source': path.resolve(__dirname, 'source'), // Keep for backward compatibility
      '@/src': path.resolve(__dirname, 'src'), // Keep original src accessible
    },
  },
});
