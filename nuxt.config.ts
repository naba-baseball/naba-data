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
    },
  },
  runtimeConfig: {
    databaseURL: import.meta.env.NUXT_DATABASE_URL,
  },
});