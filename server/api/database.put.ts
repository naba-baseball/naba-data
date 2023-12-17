import papa from 'papaparse'

export default eventHandler(async (event) => {
  await useDB().db('ratings').dropDatabase()
  const db = useDB().db('ratings')
  const [teams, roster, players, batting, pitching, fielding, contract] = await Promise.all([
    setupDB('teams.csv'),
    setupDB('team_roster.csv'),
    setupDB('players.csv'),
    setupDB('players_batting.csv'),
    setupDB('players_pitching.csv'),
    setupDB('players_fielding.csv'),
    setupDB('players_contract.csv'),
  ])

  await db.collection('teams').insertMany(
    teams.map((team) => {
      team.roster = roster.filter(r => r.team_id === team.team_id)
      return team
    }),
  )
  await db.collection('players').insertMany(
    players.map((player) => {
      player.pitching = scaleObject(
        pitching.find(p => p.player_id === player.player_id),
      )

      player.batting = scaleObject(
        batting.find(p => p.player_id === player.player_id),
      )

      player.fielding = scaleObject(
        fielding.find(p => p.player_id === player.player_id),
      )

      player.contract = contract.find(c => c.player_id === player.player_id)

      return player
    }),
  )
  return 'ok'
})

async function setupDB(
  fileName: string,
) {
  const file = (await useStorage('files').getItem(fileName)) as string
  const { data: docs } = await papa.parse(file, {
    dynamicTyping: true,
    header: true,
  })
  return docs
}
