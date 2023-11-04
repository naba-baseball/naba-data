export default eventHandler(async () => {
  extractRatingsFromCSV('players_batting.csv', 'batting')
  return 'ok'
})
