export default defineNuxtRouteMiddleware(async () => {
  let { data: user } = useNuxtData('user')
  if (!user.value) {
    await useUser().api
    user = useNuxtData('user').data
  }
  if (user.value?.role !== 'admin')
    return navigateTo('/')
})
