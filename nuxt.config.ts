// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-01',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@formkit/auto-animate/nuxt',
    '@pinia/nuxt',
  ],
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
  eslint: {
    config: {
      standalone: false,
    },
  },
  experimental: {
    asyncContext: true,
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
    },
  },
  ui: {
    icons: ['lucide'],
  },
  fonts: {
    experimental: {
      processCSSVariables: true,
    },
  },
})
