export function useUser() {
  const userAPI = useFetch('/api/user', { immediate: false, key: 'user' })
  return { user: userAPI.data, api: userAPI }
}
