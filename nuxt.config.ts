// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt', '@nuxtjs/hanko', '@pinia/nuxt'],
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
})
