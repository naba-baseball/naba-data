const watchDirectoryStore = defineStore('watchDirectory', () => {
  const isWatching = ref(false)
  useFetch('/api/preference', {
    method: 'POST',
    dedupe: 'defer',
    key: 'updateWatchingDirectory',
    body: {
      key: 'watchingDirectory',
      value: isWatching,
    },
    immediate: false,
  })
  const isWatchingAPI = useFetch<boolean | null>('/api/preference', {
    dedupe: 'defer',
    key: 'getWatchingDirectory',
    query: {
      key: 'watchingDirectory',
    },
  })
  watchEffect(() => {
    isWatching.value = !!isWatchingAPI.data.value
  })

  return { isWatching }
})
export function useWatchDirectory() {
  const store = watchDirectoryStore()
  return {
    isWatching: toRef(store, 'isWatching'),
  }
}
