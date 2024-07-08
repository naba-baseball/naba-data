export function useLastUploaded() {
  const lastUpdatedAPI = useLazyFetch<number | null>('/api/preference', { key: 'last_uploaded', dedupe: 'defer', query: {
    key: 'last_uploaded',
  } })
  return lastUpdatedAPI
}
