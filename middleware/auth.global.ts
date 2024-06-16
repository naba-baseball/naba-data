export default defineNuxtRouteMiddleware(async () => {
  const user = useUser()
  if (!user.value) {
   const {data} = await useFetch('/api/user', {key : 'user'})
   user.value = data.value
  }
})
