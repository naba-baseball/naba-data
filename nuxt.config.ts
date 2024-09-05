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
  experimental: {
    buildCache: true,
  },
  routeRules: {
    '/teams': {
      redirect: '/',
    },
    '/': {
      prerender: true,
    },
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
  },
  modules: ['@formkit/auto-animate/nuxt', '@vite-pwa/nuxt'],
  pwa: {
    registerType: 'prompt',
    scope: '/',
    workbox: {
      globPatterns: ['**\/*.{js,json,css,html,png,jpg,jpeg,svg}'],
      runtimeCaching: [{
        urlPattern: ({ url }) => url.origin === 'http://localhost:3000' && (url.pathname.startsWith('/api/teams') || url.pathname.startsWith('/api/players')),
        handler: 'CacheFirst',
        options: {
          cacheName: 'teams-players-cache',
          cacheableResponse: {
            statuses: [200],
          },
        },
      }, {
        urlPattern: ({ url }) => url.origin === 'https://api.iconify.design',
        handler: 'CacheFirst',
        options: {
          cacheName: 'iconify-cache',
          cacheableResponse: {
            statuses: [200],
          },
        },
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
