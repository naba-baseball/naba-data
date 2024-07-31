const isWatchingDirectory = () => useState('watchingDirectory', () => false)
export function useWatchDirectoryPreference() {
  const isWatching = isWatchingDirectory()
  useFetch('/api/preference', {
    method: 'POST',
    dedupe: 'defer',
    body: {
      key: 'watchingDirectory',
      value: isWatching,
    },
    immediate: false,
  })

  const isWatchingAPI = useFetch<boolean | null>('/api/preference', {
    dedupe: 'defer',
    query: {
      key: 'watchingDirectory',
    },
  })
  watchEffect(() => {
    isWatching.value = !!isWatchingAPI.data.value
  })

  return isWatching
}
