export default eventHandler(async (event) => {
  await saveFile(event, 'players_batting.csv')
  await $fetch('/api/batting', { method: 'PUT' })
  return 'ok'
})
