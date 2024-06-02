import papa from 'papaparse'
import { drizzle } from 'db0/integrations/drizzle/index'
import type { Player, Team } from '../utils/tables.js'

export default authenticatedEventHandler(async () => {
  const db = useDatabase()
  await db.sql`DROP TABLE IF EXISTS teams`
  await db.sql`CREATE TABLE teams (
    "team_id" integer,
    "name" text,
    "abbr" text,
    "nickname" text,
    "logo_file_name" text
  )`

  await db.sql`DROP TABLE IF EXISTS players`
  await db.sql`
    CREATE TABLE players (
         "player_id" integer,
         "first_name" text,
         "last_name" text,
         "team_id" integer,
         "position" integer,
         "age" integer,
         "role" integer,
         "bats" integer,
         "roster" text,
         "batting_ratings_overall_contact" integer,
         "batting_ratings_overall_gap" integer,
         "batting_ratings_overall_eye" integer,
         "batting_ratings_overall_strikeouts" integer,
         "batting_ratings_overall_hp" integer,
         "batting_ratings_overall_power" integer,
         "batting_ratings_overall_babip" integer,
         "batting_ratings_vsr_contact" integer,
         "batting_ratings_vsr_gap" integer,
         "batting_ratings_vsr_eye" integer,
         "batting_ratings_vsr_strikeouts" integer,
         "batting_ratings_vsr_hp" integer,
         "batting_ratings_vsr_power" integer,
         "batting_ratings_vsr_babip" integer,
         "batting_ratings_vsl_contact" integer,
         "batting_ratings_vsl_gap" integer,
         "batting_ratings_vsl_eye" integer,
         "batting_ratings_vsl_strikeouts" integer,
         "batting_ratings_vsl_hp" integer,
         "batting_ratings_vsl_power" integer,
         "batting_ratings_vsl_babip" integer,
         "batting_ratings_talent_contact" integer,
         "batting_ratings_talent_gap" integer,
         "batting_ratings_talent_eye" integer,
         "batting_ratings_talent_strikeouts" integer,
         "batting_ratings_talent_hp" integer,
         "batting_ratings_talent_power" integer,
         "batting_ratings_talent_babip" integer,
         "batting_ratings_misc_bunt" integer,
         "batting_ratings_misc_bunt_for_hit" integer,
         "batting_ratings_misc_gb_hitter_type" integer,
         "batting_ratings_misc_fb_hitter_type" integer,
       
         "pitching_ratings_overall_stuff" integer,
         "pitching_ratings_overall_control" integer,
         "pitching_ratings_overall_movement" integer,
         "pitching_ratings_overall_balk" integer,
         "pitching_ratings_overall_hp" integer,
         "pitching_ratings_overall_wild_pitch" integer,
         "pitching_ratings_vsr_stuff" integer,
         "pitching_ratings_vsr_control" integer,
         "pitching_ratings_vsr_movement" integer,
         "pitching_ratings_vsr_balk" integer,
         "pitching_ratings_vsr_hp" integer,
         "pitching_ratings_vsr_wild_pitch" integer,
         "pitching_ratings_vsl_stuff" integer,
         "pitching_ratings_vsl_control" integer,
         "pitching_ratings_vsl_movement" integer,
         "pitching_ratings_vsl_balk" integer,
         "pitching_ratings_vsl_hp" integer,
         "pitching_ratings_vsl_wild_pitch" integer,
         "pitching_ratings_talent_stuff" integer,
         "pitching_ratings_talent_control" integer,
         "pitching_ratings_talent_movement" integer,
         "pitching_ratings_talent_balk" integer,
         "pitching_ratings_talent_hp" integer,
         "pitching_ratings_talent_wild_pitch" integer,
         "pitching_ratings_pitches_fastball" integer,
         "pitching_ratings_pitches_slider" integer,
         "pitching_ratings_pitches_curveball" integer,
         "pitching_ratings_pitches_screwball" integer,
         "pitching_ratings_pitches_forkball" integer,
         "pitching_ratings_pitches_changeup" integer,
         "pitching_ratings_pitches_sinker" integer,
         "pitching_ratings_pitches_splitter" integer,
         "pitching_ratings_pitches_knuckleball" integer,
         "pitching_ratings_pitches_cutter" integer,
         "pitching_ratings_pitches_circlechange" integer,
         "pitching_ratings_pitches_knucklecurve" integer,
         "pitching_ratings_pitches_talent_fastball" integer,
         "pitching_ratings_pitches_talent_slider" integer,
         "pitching_ratings_pitches_talent_curveball" integer,
         "pitching_ratings_pitches_talent_screwball" integer,
         "pitching_ratings_pitches_talent_forkball" integer,
         "pitching_ratings_pitches_talent_changeup" integer,
         "pitching_ratings_pitches_talent_sinker" integer,
         "pitching_ratings_pitches_talent_splitter" integer,
         "pitching_ratings_pitches_talent_knuckleball" integer,
         "pitching_ratings_pitches_talent_cutter" integer,
         "pitching_ratings_pitches_talent_circlechange" integer,
         "pitching_ratings_pitches_talent_knucklecurve" integer,
         "pitching_ratings_misc_velocity" integer,
         "pitching_ratings_misc_arm_slot" integer,
         "pitching_ratings_misc_stamina" integer,
         "pitching_ratings_misc_ground_fly" integer,
         "pitching_ratings_misc_hold" integer,
         "pitching_ratings_babip" integer
    )
  `

  const { players, teams } = await processData()
  const driz = drizzle(db)
  const batchSize = 100
  const total = players.length
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
  return 'ok'
}, 'admin')

async function setupDB<T>(fileName: string) {
  const file = (await useStorage('files').getItem(fileName)) as string
  const { data: docs } = await papa.parse(file, {
    dynamicTyping: true,
    header: true,
  })
  return docs as T[]
}

async function processData() {
  const [teams, roster, players, batting, pitching] = await Promise.all([
    setupDB<any>('teams.csv'),
    setupDB<any>('team_roster.csv'),
    setupDB<any>('players.csv'),
    setupDB<any>('players_batting.csv'),
    setupDB<any>('players_pitching.csv'),
  ])
  const finishedPlayers = players.map((p: Partial<Player>) => {
    const player = {
      bats: p.bats,
      first_name: p.first_name,
      last_name: p.last_name,
      player_id: p.player_id,
      position: p.position,
      role: p.role,
      age: p.age,
      team_id: p.team_id,
    } satisfies Partial<Player>
    const playerPitching = scaleObject(
      pitching.find(p => p.player_id === player.player_id),
    )
    Object.entries(playerPitching).forEach(([key, value]) => {
      // @ts-expect-error gotta get the key somehow
      player[key] = value
    })

    const playerBatting = scaleObject(
      batting.find(p => p.player_id === player.player_id),
    )
    Object.entries(playerBatting).forEach(([key, value]) => {
      // @ts-expect-error gotta get the key somehow
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
  }
}
