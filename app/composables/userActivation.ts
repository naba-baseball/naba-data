export function useUserActivation() {
  const isActive = ref(navigator.userActivation.isActive || navigator.userActivation.hasBeenActive)
  if (!isActive.value) {
    useTimeoutPoll(() => {
      isActive.value = navigator.userActivation.isActive || navigator.userActivation.hasBeenActive
    }, 250, { immediate: true })
  }
  return { isActive }
}
