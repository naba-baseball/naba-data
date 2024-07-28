import papa from 'papaparse'
import { drizzle } from 'db0/integrations/drizzle/index'

export default authenticatedEventHandler(async () => {
  await createTeamsTable()
  await createPlayersTable()
  await createPlayerCareerBattingStats()
  const db = useDatabase()
  const { players, teams, playerCareerBattingStats } = await processData()
  const driz = drizzle(db)
  const batchSize = 100
  const total = players.length
  await driz.insert(PlayerCareerBattingStats).values(playerCareerBattingStats)
  let startIndex = 0
  while (startIndex < total) {
    const endIndex = Math.min(startIndex + batchSize, total)
    const batch = players.slice(startIndex, endIndex)
    await driz.insert(PlayersTable).values(batch)
    startIndex += batchSize
  }
  await driz.insert(TeamsTable).values(teams)
  await db.sql`CREATE INDEX "team_id_idx" ON "teams" ("team_id")`
  await db.sql`CREATE INDEX "players_player_id_idx" ON "players" ("player_id")`
  await db.sql`CREATE INDEX "players_team_id_idx" ON "players" ("team_id")`
  await db.sql`CREATE INDEX "players_career_batting_stats_player_id_idx" ON "players_career_batting_stats" ("player_id")`

  const meta = useStorage('preferences')
  await meta.setItem('last_uploaded', Date.now())
  return 'ok'
}, 'admin')

async function getCSVData<T>(fileName: string) {
  const file = (await useStorage('files').getItem(fileName)) as string
  const { data: docs } = await papa.parse(file, {
    dynamicTyping: true,
    header: true,
  })
  return docs as T[]
}

async function processData() {
  const [teams, roster, players, batting, pitching, careerBattingStats] = await Promise.all([
    getCSVData<any>('teams.csv'),
    getCSVData<any>('team_roster.csv'),
    getCSVData<any>('players.csv'),
    getCSVData<any>('players_batting.csv'),
    getCSVData<any>('players_pitching.csv'),
    getCSVData('players_career_batting_stats.csv'),
  ])
  const finishedPlayers = players.filter(p => p.player_id != null).map((p: Partial<Player>) => {
    const player: Partial<Player> = {
      bats: p.bats,
      throws: p.throws,
      first_name: p.first_name,
      last_name: p.last_name,
      player_id: p.player_id,
      position: p.position,
      role: p.role,
      age: p.age,
      team_id: p.team_id,
    }
    const playerPitching = scaleObject(
      pitching.find(p => p.player_id === player.player_id),
    )
    Object.entries(playerPitching).forEach(([key, value]) => {
      if (key.includes('pitching_ratings'))
      // @ts-expect-error should be assigning a pitching_ratings_KEY to player
        player[key] = value
    })

    const playerBatting = scaleObject(
      batting.find(p => p.player_id === player.player_id),
    )
    Object.entries(playerBatting).forEach(([key, value]) => {
      if (key.includes('batting_ratings'))
        // @ts-expect-error should be assigning a batting_ratings_KEY to player
        player[key] = value
    })
    if (
      roster.find(r => r.player_id === player.player_id && r.list_id === 2)
    )
      player.roster = 'primary'

    player.roster ??= 'reserve'
    return player
  })
  return {
    players: finishedPlayers,
    teams: teams.filter(team => team.team_id != null && team.nickname.toLowerCase() !== 'all-stars').map((team) => {
      return {
        abbr: team.abbr,
        name: team.name,
        nickname: team.nickname,
        team_id: team.team_id,
        logo_file_name: team.logo_file_name,
      } satisfies Team
    }),
    playerCareerBattingStats: careerBattingStats,
  }
}
