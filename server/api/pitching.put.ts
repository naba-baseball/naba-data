export default eventHandler(async (event) => {
  extractRatingsFromCSV('players_pitching.csv', 'pitching')
  return 'ok'
})