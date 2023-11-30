export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.performance = import.meta.env.DEV
})
