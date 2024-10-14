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
  routeRules: {
    '/lineups': {
      ssr: false,
    },
    '/': {
      redirect: '/teams',
    },
  },
  experimental: {
    asyncContext: true,
    viewTransition: true,
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
