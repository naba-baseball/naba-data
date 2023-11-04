export default eventHandler(async () => {
  extractRatingsFromCSV('players_pitching.csv', 'pitching')
  return 'ok'
})
