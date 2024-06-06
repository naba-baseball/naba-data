// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    },
    storage: {
      files: {
        driver: 'fsLite',
        base: '.files',
      },
    },
  },
  fonts: {
    experimental: {
      processCSSVariables: true,
    },
  },
})
