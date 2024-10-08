import { parse } from '@std/csv'
import { sql } from 'drizzle-orm'

export default eventHandler(async () => {
  await checkRole('admin')
  await createTeamsTable()
  await createPlayersTable()
  await createPlayerCareerBattingStats()
  const { players, teams, playerCareerBattingStats } = await processData()
  const db = useSqlite()
  if (playerCareerBattingStats) {
    await db.transaction(async () => {
      await db.insert(PlayerCareerBattingStats).values(playerCareerBattingStats)
    })
  }
  await batchOperations(players, async (batch) => {
    await db.transaction(async () => {
      await db.insert(PlayersTable).values(batch)
    })
  })
  teams.push({ team_id: 0, name: 'Free agents', abbr: 'FA', nickname: '', logo_file_name: '' })
  await db.transaction(async () => {
    await db.insert(TeamsTable).values(teams)
  })
  await db.run(sql`CREATE INDEX "team_id_idx" ON "teams" ("team_id")`)
  await db.run(sql`CREATE INDEX "players_player_id_idx" ON "players" ("player_id")`)
  await db.run(sql`CREATE INDEX "players_team_id_idx" ON "players" ("team_id")`)
  await db.run(sql`CREATE INDEX" players_team_id_roster_position_idx" ON "players" ("team_id", "roster", "position", "last_name" asc)`)
  await db.run(sql`CREATE INDEX "players_career_batting_stats_player_id_idx" ON "players_career_batting_stats" ("player_id")`)
  const meta = useStorage('preferences')
  await meta.setItem('last_uploaded', Date.now())
  await useStorage('cache').clear()
  setResponseHeader(useEvent(), 'Clear-Site-Data', '"cache"')
  return 'ok'
})

async function batchOperations<T>(data: T[], operation: (val: T[]) => void | Promise<void>) {
  const batchSize = 5
  let startIndex = 0
  const total = data.length
  while (startIndex < total) {
    const endIndex = Math.min(startIndex + batchSize, total)
    const batch = data.slice(startIndex, endIndex)
    await operation(batch)
    startIndex += batchSize
  }
}

async function getCSVData<T extends object>(fileName: string) {
  const file = (await useStorage('files').getItem(fileName)) as string
  const docs = parse(file, { skipFirstRow: true })
  return docs.map((doc) => {
    const newDoc = {}
    for (const key in doc) {
      const num = Number(doc[key])
      newDoc[key] = Number.isNaN(num) ? doc[key] : num
    }
    return newDoc as T
  })
}

async function processData() {
  const [{ value: teams }, { value: roster }, { value: players }, { value: batting }, { value: pitching }, { value: careerBattingStats }] = await Promise.allSettled([
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
