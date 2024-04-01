// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@vueuse/nuxt", "radix-vue/nuxt", "@nuxt/fonts"],
  css: [
    "@unocss/reset/tailwind.css",
    "@/assets/css/reset.css",
    "@/assets/css/ratings.css",
    "@/assets/css/variables.css",
    "@/assets/css/main.css",
  ],
  nitro: {
    storage: {
      files: {
        driver: "fsLite",
        base: ".files",
      },
    },
  },
  routeRules: {
    "/api/teams/**": {
      swr: 60 * 60 * 24,
    },
    "/": {
      cache:{
        headersOnly: true
      },
      swr: 60 * 60 * 24,
    },
    "/teams/**": {
      cache:{
        headersOnly: true
      },
      swr: 60 * 60 * 24,
    },
  },
  runtimeConfig: {
    databaseURL: import.meta.env.NUXT_DATABASE_URL,
  },
});
