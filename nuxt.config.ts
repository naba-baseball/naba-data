// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@vueuse/nuxt", "radix-vue/nuxt", "@nuxt/ui"],
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
  runtimeConfig: {
    databaseURL: "",
  },
  experimental:{
    inlineRouteRules: true
  }
});
