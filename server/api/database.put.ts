export default eventHandler(async () => {
  await Promise.all([
    importCSV('players.mysql.sql', 'players'),
    importCSV('teams.mysql.sql', 'teams'),
    importCSV('players_batting.mysql.sql', 'players_batting'),
    importCSV('players_pitching.mysql.sql', 'players_pitching'),
    importCSV('players_fielding.mysql.sql', 'players_fielding'),
  ])
  return 'ok'
})
