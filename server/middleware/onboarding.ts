export default defineEventHandler(async (event) => {
  const preferences = useStorage('preferences')
  const isOnboarding = await preferences.getItem<boolean>('onboarding')
  if (isOnboarding == null)
    setCookie(event, 'onboarding', `${true}`)
})
