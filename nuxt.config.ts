// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "radix-vue/nuxt",
    "@nuxt/fonts",
  ],
  css: [
    "@unocss/reset/tailwind.css",
    "@/assets/css/reset.css",
    "@/assets/css/ratings.css",
    "@/assets/css/variables.css",
    '@/assets/css/main.css'
  ],
  nitro: {
    storage: {
      files: {
        driver: "fsLite",
        base: ".files",
      },
      sqliteDB:{
        driver: 'fsLite',
        base: '.db'
      }
    },
    experimental: {
      tasks: true,
    },
  },
  routeRules: {
    // "/*": {
    //   swr: true,
    // },
    // "/api/**": {
    //   // swr: true,
    //   cache: {
    //     headersOnly: true,
    //     maxAge: 60 * 60 * 24,
    //   },
    //   headers: { xtest: "asdf" },
    // },
  },
  runtimeConfig: {
    databaseURL: import.meta.env.NUXT_DATABASE_URL,
    tursoAuthToken: import.meta.env.NUXT_TURSO_AUTH_TOKEN,
  },
});
