// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    '@nuxt/image',
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
