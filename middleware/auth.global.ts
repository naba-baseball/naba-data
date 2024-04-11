export default defineNuxtRouteMiddleware(async () => {
  const user = useUser()
  if (!user.value && import.meta.server) {
    const data = await useRequestFetch()('/api/user')
    if (data)
      user.value = data
  }
})
