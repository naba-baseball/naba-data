export function useLastUploaded() {
  const lastUploadedAPI = useLazyFetch<number | null>('/api/preference', { key: 'last_uploaded', dedupe: 'defer', query: {
    key: 'last_uploaded',
  } })
  return {
    api: lastUploadedAPI,
    lastUploadedDate: toRef(() => {
      return lastUploadedAPI.data.value
    }),
    lastUploaded: computed(() => {
      if (!lastUploadedAPI.data.value)
        return ''
      return new Date(lastUploadedAPI.data.value).toLocaleString('en-us', {
        timeStyle: 'short',
        dateStyle: 'long',
      })
    }),
  }
}
