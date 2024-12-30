const state = () => useState(() => false)
export const useMobileWidth = createSharedComposable(() => {
  const isMobile = state()
  if (import.meta.server)
    return isMobile
  const { width } = useWindowSize({})
  watchEffect(() => {
    isMobile.value = (width.value < 640)
  })
  return isMobile
})
