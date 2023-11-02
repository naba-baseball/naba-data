export default eventHandler(async (event) => {
  await saveFile(event, 'players_fielding.csv')
  await $fetch('/api/fielding', { method: 'PUT' })
  return 'ok'
})
