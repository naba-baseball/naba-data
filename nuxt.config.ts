// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', '@vueuse/nuxt', 'radix-vue/nuxt', '@nuxt/fonts', '@nuxt/eslint'],
  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/css/reset.css',
    '@/assets/css/ratings.css',
    '@/assets/css/variables.css',
    '@/assets/css/main.css',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  nitro: {
    storage: {
      files: {
        driver: 'fsLite',
        base: '.files',
      },
    },
  },
  // routeRules: {
  //   '/api/teams/**': {
  //     cache: {
  //       staleMaxAge: -1,
  //     },
  //   },
  // },
  runtimeConfig: {
    databaseURL: import.meta.env.NUXT_DATABASE_URL,
  },
})
