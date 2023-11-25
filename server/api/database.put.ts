export default eventHandler(async (event) => {
  await verifyHankoEvent(event)
  await Promise.all([
    setupDB('players.mysql.sql', 'players'),
    setupDB('teams.mysql.sql', 'teams'),
    setupDB('players_batting.mysql.sql', 'players_batting'),
    setupDB('players_pitching.mysql.sql', 'players_pitching'),
    setupDB('players_fielding.mysql.sql', 'players_fielding'),
  ])
  return 'ok'
})
