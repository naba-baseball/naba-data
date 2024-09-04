import { CacheFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  extends: 'github:naba-baseball/naba-base-layer/layer',
  ssr: false,
  css: [
    '@/assets/css/main.css',
  ],
  app: {
    keepalive: true,
  },
  nitro: {
    experimental: {
      database: true,
    },
    storage: {
      meta: {
        driver: 'fsLite',
        base: '.data/meta',
      },
      files: {
        driver: 'fsLite',
        base: '.data/files',
      },
      preferences: {
        driver: 'fsLite',
        base: '.data/preferences',
      },
      cache: {
        driver: 'memory',
      },
    },
    prerender: {
      routes: ['/'],
    },
  },
  modules: ['@formkit/auto-animate/nuxt', '@vite-pwa/nuxt'],
  pwa: {
    registerType: 'prompt',
    scope: '/',
    workbox: {
      navigateFallbackDenylist: [/^http:\/\/localhost:3000\/api\/teams/i],
      globPatterns: ['**/*'],
      runtimeCaching: [{
        urlPattern: /^http:\/\/localhost:3000\/api\/teams|players/i,
        options: {
          cacheableResponse: { statuses: [200] },
          cacheName: 'api-teams-cache',
        },
        handler: 'CacheFirst',
      }],
    },
    manifest: {
      name: 'NABA Data',
      short_name: 'NABAData',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'icon-black.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icon-black.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'icon-black.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
  },

})
