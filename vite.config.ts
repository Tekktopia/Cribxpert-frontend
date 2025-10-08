import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
    enabled: true, // 👈 forces PWA to run during `npm run dev`
  },
      manifest: {
        name: 'Cribxpert',
        short_name: 'Cribxpert',
        description: 'A sample PWA built with React and TypeScript.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      includeAssets: [
        'favicon.svg',
        'robots.txt',
        'web-app-manifest-192x192.png',
        'web-app-manifest-512x512.png',
        'apple-touch-icon.png'
      ],
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'source'),
      '@/source': path.resolve(__dirname, 'source'),
      '@/src': path.resolve(__dirname, 'src'),
    },
  },
});
