// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@vueuse/nuxt", "@pinia/nuxt", "@unocss/nuxt", 'radix-vue/nuxt'],
  css: ["~/assets/reset.css"],
  nitro: {
    esbuild: {
      options: {
        target: "esnext",
      },
    },
    storage: {
      files: {
        driver: "fsLite",
        base: ".files",
      },
    },
  },
  vue: {
    defineModel: true,
  },
  runtimeConfig: {
    databaseURL: "",
  },
});
