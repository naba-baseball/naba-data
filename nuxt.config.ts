// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  extends: 'github:naba-baseball/naba-base-layer/layer',
  css: [
    '@/assets/css/main.css',
  ],
  app: {
    keepalive: true,
  },
  $production: {
    routeRules: {
      '/api/teams/*': {
        cache: {
          headersOnly: true,
          swr: true,
          maxAge: 60 * 60 * 24 * 7,
        },
      },
      '/api/players/*': {
        cache: {
          headersOnly: true,
          swr: true,
          maxAge: 60 * 60 * 24 * 7,
        },
      },

    },
  },
  routeRules: {
    '/': {
      redirect: '/teams',
    },
  },
  experimental: {
    asyncContext: true,
  },
  nitro: {
    experimental: {
      asyncContext: true,
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
  runtimeConfig: {
    /** Try lowering this number if you get errors on database import. This is how many records will be loaded at a time when inserting.  */
    dbImportChunks: 100,
  },
  modules: ['@formkit/auto-animate/nuxt', 'nuxt-auth-utils'],
})
