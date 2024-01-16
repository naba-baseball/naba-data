import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@unocss/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true, ssr: true }));
      });
    },
    "@vueuse/nuxt",
    "@pinia/nuxt"
  ],
  build: {
    transpile: ["vuetify"],
  },
  css: [
    "@/assets/styles.scss",
    "@unocss/reset/tailwind-compat.css",
    "@/assets/css/reset.css",
    "@/assets/css/ratings.css",
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  nitro: {
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
  experimental: {
    inlineRouteRules: true,
  },
});
