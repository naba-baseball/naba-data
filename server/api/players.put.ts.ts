export default eventHandler(async () => {
  extractRatingsFromCSV('players.csv', 'players')
  return 'ok'
})
