// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@vueuse/nuxt'],
  nitro: {
    esbuild:{
      options:{
        target: 'esnext'
      }
    },
    storage: {
      redis: {
        driver: 'redis',
        base: 'cache',
        host: 'localhost',
        port: 6379
      },
      files: {
        driver: 'fs',
        base: '.files'
      }
    }
  },
  routeRules: {
    '*': {
      ssr: false
    }
  },
  experimental: {
    asyncContext: true
  },
  runtimeConfig: {
    public: {
      csvServiceURL: 'http://localhost:3000/api'
    }
  }
})
