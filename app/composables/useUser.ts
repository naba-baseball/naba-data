export function useUser() {
  const api = useFetch('/api/user', { key: 'user', default: () => ({ role: 'guest' }) })
  const { data: user } = useNuxtData('user')
  return { user, api, refresh: () => refreshNuxtData('user') }
}
