// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt'],
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
  },
  runtimeConfig: {
    public: {
      graphqlURL: '',
      restURL: '',
      ratingsServiceURL: '',
    },
    databaseURL: '',
  },
})
