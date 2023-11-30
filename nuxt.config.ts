// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@nuxtjs/hanko', '@pinia/nuxt', '@unocss/nuxt'],
  css: ['~/assets/reset.css'],
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    storage: {
      files: {
        driver: 'fsLite',
        base: '.files',
      },
    },
  },
  vue: {
    defineModel: true,
  },
  ssr: false,
  // routeRules: {
  //   '*': {
  //     ssr: false,
  //   },
  // },
  experimental: {
    asyncContext: true,
    inlineRouteRules: true,
    headNext: true,
  },
  runtimeConfig: {
    databaseURL: '',
  },
  hanko: {
    augmentContext: false,
  },
})
