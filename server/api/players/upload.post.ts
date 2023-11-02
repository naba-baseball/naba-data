export default eventHandler(async (event) => {
  await saveFile(event, 'players.csv')
  await $fetch('/api/players', { method: 'PUT' })
  return 'ok'
})
