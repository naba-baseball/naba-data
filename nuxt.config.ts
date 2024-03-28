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
    experimental: {
      tasks: true,
    },
  },
  routeRules: {
    // "/**": {
    //   cache: {
    //     headersOnly: true,
    //     maxAge: 60 * 60 * 24,
    //     swr: true,
    //   },
    // },
    // "/api/**": {
    //   cache: {
    //     headersOnly: true,
    //     maxAge: 60 * 60 * 24,
    //   },
    // },
  },
  runtimeConfig: {
    databaseURL: import.meta.env.NUXT_DATABASE_URL,
    tursoAuthToken: import.meta.env.NUXT_TURSO_AUTH_TOKEN,
  },
});
