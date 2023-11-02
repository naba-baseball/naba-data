export default eventHandler(async (event) => {
  extractRatingsFromCSV('players_batting.csv', 'batting')
  return 'ok'
})