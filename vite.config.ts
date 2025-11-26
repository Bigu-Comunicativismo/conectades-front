import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Conectades',
        short_name: 'Conectades',
        description: 'Conectades.',
        theme_color: '#efeef3',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: "./src/pages",
      generatedRouteTree: "./src/routeTree.gen.ts",
      routeFileIgnorePrefix: "-",
      quoteStyle: "single"
    }),
    react(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://conectades.com.br',
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
