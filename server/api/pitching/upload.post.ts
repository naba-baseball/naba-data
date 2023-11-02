export default eventHandler(async (event) => {
  await saveFile(event, 'players_pitching.csv')
  await $fetch('/api/pitching', { method: 'PUT' })
  return 'ok'
})
