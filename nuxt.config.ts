// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-09-24',
  experimental: {
    viewTransition: true,
  },
  extends: 'github:naba-baseball/naba-base-layer/layer',
  css: [
    '@/assets/css/main.css',
  ],
  app: {
    keepalive: true,
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
    '/': {
      redirect: '/teams',
    },
  },
  nitro: {
    devStorage: {
      files: {
        driver: 'fsLite',
        base: '.data/files',
      },
      preferences: {
        driver: 'fsLite',
        base: '.data/preferences',
      },
    },
    storage: {
      files: {
        driver: 'cloudflareR2Binding',
        binding: 'FILES',
      },
      preferences: {
        driver: 'cloudflareKVBinding',
        binding: 'PREFERENCES',
      },
    },
  },
  runtimeConfig: {
    public: {
      discordAuthorizeUrl: '',
    },
    dbUrl: '',
    dbToken: '',
    /** seperated by : */
    adminUsers: '',
  },
  modules: [
    '@formkit/auto-animate/nuxt',
    'nuxt-auth-utils',
  ],
})
