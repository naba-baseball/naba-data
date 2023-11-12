export default eventHandler(async (event) => {
  await saveFile(event, 'teams.csv')
  await $fetch('/api/teams', { method: 'PUT' })
  return 'ok'
})
