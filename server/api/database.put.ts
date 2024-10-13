import type { CareerBatting, Player, PlayerBattingRating, PlayerPitchingRating, Team, TeamRoster } from '~~/types/db.js'
import type { H3Event } from 'h3'
import { parse } from '@std/csv'
import { defu } from 'defu'
import { sql } from 'kysely'

export default eventHandler(async (event) => {
  await checkRole('admin')
  await rollbackMigrations()
  await runMigrations()
  const db = useDB()

  const teams = await getCSVData<Team>('teams.csv', { pick: ['abbr', 'name', 'nickname', 'team_id', 'logo_file_name'] })
  await batchOperations(event, teams, async (batch) => {
    await db.transaction().execute((trx) => {
      return trx.insertInto('teams').values(batch).execute()
    })
  })

  const players = await getCSVData<Player>('players.csv', { pick: ['age', 'bats', 'first_name', 'last_name', 'player_id', 'position', 'role', 'team_id', 'throws'] })
  await batchOperations(event, players, async (batch) => {
    await db.transaction().execute((trx) => {
      return trx.insertInto('players').values(batch).execute()
    })
  })

  const playerBatting = await getCSVData<PlayerBattingRating>('players_batting.csv')
  await batchOperations(event, playerBatting, async (batch) => {
    await db.transaction().execute((trx) => {
      return trx.insertInto('players_batting').values(batch.map(scaleObject)).execute()
    })
  })

  const playerPitching = await getCSVData<PlayerPitchingRating>('players_pitching.csv')
  await batchOperations(event, playerPitching, async (batch) => {
    await db.transaction().execute((trx) => {
      return trx.insertInto('players_pitching').values(batch.map(scaleObject)).execute()
    })
  })

  const careerBattingStats = await getCSVData<CareerBatting>('players_career_batting_stats.csv')
  await batchOperations(event, careerBattingStats, async (batch) => {
    await db.transaction().execute((trx) => {
      return trx.insertInto('players_career_batting').values(batch).execute()
    })
  })

  /** ADD PLAYER ROSTER FIELD */
  const roster = await getCSVData<TeamRoster>('team_roster.csv')
  await batchOperations(event, roster, async (batch) => {
    await db.transaction().execute((trx) => {
      return trx.insertInto('team_roster').values(batch).execute()
    })
  })
  await sql`update players 
set 
    roster = 'reserve'
from team_roster as r
where r.player_id = players.player_id and r.list_id=1`.execute(db)
  await sql`update players 
set 
    roster = 'primary'
from team_roster as r
where r.player_id = players.player_id and r.list_id=2`.execute(db)

  const meta = useStorage('preferences')
  await meta.setItem('last_uploaded', Date.now())
  await useStorage('cache').clear()
  setResponseHeader(useEvent(), 'Clear-Site-Data', '"cache"')
  return 'ok'
})

async function batchOperations<T>(event: H3Event, data: T[], operation: (val: T[]) => void | Promise<void>) {
  const batchSize = useRuntimeConfig(event).dbImportChunks
  let startIndex = 0
  const total = data.length
  while (startIndex < total) {
    const endIndex = Math.min(startIndex + batchSize, total)
    const batch = data.slice(startIndex, endIndex)
    await operation(batch)
    startIndex += batchSize
  }
}

async function getCSVData<T extends Record<string, number | string | null>>(fileName: string, _opts: { pick?: (keyof T)[], omit?: string[] } = {}) {
  const options = defu(_opts, {
    omit: ['league_id'],
  })
  const file = (await useStorage('files').getItem(fileName)) as string
  if (!file)
    return []
  const docs = parse(file, { skipFirstRow: true })
  return docs.map((doc) => {
    const newDoc = {} as T
    let keyArr = options.pick || Object.keys(doc)
    if (options.omit)
      keyArr = keyArr.filter(key => !options.omit.includes(key))
    for (const key of keyArr) {
      const num = Number(doc[key as string])
      newDoc[key] = Number.isNaN(num) ? doc[key] : num
    }
    return newDoc as T
  })
}
