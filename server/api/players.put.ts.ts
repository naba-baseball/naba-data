export default eventHandler(async (event) => {
  extractRatingsFromCSV('players.csv', 'players')
  return 'ok'
})
