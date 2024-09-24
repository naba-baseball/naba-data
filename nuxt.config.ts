// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
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
    compressPublicAssets: {
      brotli: true,
    },
    experimental: {
      database: true,
    },
    devStorage: {
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
    },
    storage: {
      meta: {
        driver: 'cloudflareKVBinding',
        binding: 'META',
      },
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
  },
  modules: [
    '@formkit/auto-animate/nuxt',
    'nuxt-auth-utils',
  ],
})
