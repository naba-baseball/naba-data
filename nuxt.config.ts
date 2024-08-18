// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-01',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  css: [
    '@/assets/css/main.css',
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  experimental: {
    asyncContext: true,
    typedPages: true,
  },
  routeRules: {
    '/api/teams/**': {
      swr: 600,
      cache: {
        name: 'teams-cache',
      },
    },
    '/api/players/**': {
      swr: 600,
      cache: {
        name: 'players-cache',
      },
    },
  },
  nitro: {
    compressPublicAssets: {
      brotli: true,
    },
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
  modules: [
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@formkit/auto-animate/nuxt',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
})
