export default eventHandler(async (event) => {
  extractRatingsFromCSV('players_fielding.csv', 'fielding')
  return 'ok'
})