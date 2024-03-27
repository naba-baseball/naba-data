import { copyFile, readdir, mkdir, cp, writeFile } from "node:fs/promises";
import { join } from "node:path";
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
      sqliteDB: {
        driver: "fsLite",
        base: ".db",
      },
    },
    experimental: {
      tasks: true,
    },
  },
  hooks: {
    async "nitro:build:public-assets"(nitro) {
      const targetDir = join(nitro.options.output.serverDir, "drizzle");
      await cp("./server/drizzle", targetDir, { recursive: true });
    },
    // async "build:done"() {
    //   //copy drizzle files to build
    //   console.log("====copying====");
    //   await writeFile("testington", "asdfasdfasdf");
    //   await mkdir(".output/server/chunks/tasks/.drizzle", { recursive: true });
    //   await cp(".drizzle/", ".output/server/chunks/tasks/.drizzle/", {
    //     recursive: true,
    //   });
    //   console.log("====copied!====");
    // },
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
