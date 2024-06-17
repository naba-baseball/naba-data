// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future:{
    compatibilityVersion: 4
  },
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    'radix-vue/nuxt',
    '@nuxt/fonts',
    '@nuxt/eslint',
  ],
  css: [
    '@/assets/css/reset.css',
    '@/assets/css/main.css',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  nitro: {
    experimental: {
      database: true,
      asyncContext: true,
    },
    storage: {
      files: {
        driver: 'fsLite',
        base: '.files',
      },
      preferences: {
        driver: 'fsLite',
        base: '.preferences',
      },
    },
  },
  fonts: {
    experimental: {
      processCSSVariables: true,
    },
  },
})
