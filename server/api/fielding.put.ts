export default eventHandler(async () => {
  extractRatingsFromCSV('players_fielding.csv', 'fielding')
  return 'ok'
})
