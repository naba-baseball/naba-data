export default eventHandler(async () => {
  await Promise.all([
    importCSV('players.csv', 'players'),
    importCSV('teams.csv', 'teams'),
    importCSV('players_batting.csv', 'players_batting'),
    importCSV('players_pitching.csv', 'players_pitching'),
    importCSV('players_fielding.csv', 'players_fielding'),
  ])
  return 'ok'
})
