export function useLastUploaded() {
  const { data } = useLazyFetch<number | null>('/api/preference', { key: 'last_uploaded', dedupe: 'defer', query: {
    key: 'last_uploaded',
  } })
  return {
    lastUploadedDate: toRef(() => {
      return data.value
    }),
    lastUploaded: computed(() => {
      if (!data.value)
        return ''
      return new Date(data.value).toLocaleString('en-us', {
        timeStyle: 'short',
        dateStyle: 'long',
      })
    }),
  }
}
