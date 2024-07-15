import * as v from 'valibot'
import { and, asc, eq, gte, lte } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { teamId: team_id } = await getValidatedRouterParams(
    event,
    parseTeamId(),
  )
  const { split, roster } = await getValidatedQuery(event, data =>
    v.parse(
      v.object({
        roster: parseRoster(),
        split: parseSplit(),
      }),
      data,
    ))
  const db = useSqlite()
  return db.select({
    player_id: PlayersTable.player_id,
    first_name: PlayersTable.first_name,
    last_name: PlayersTable.last_name,
    age: PlayersTable.age,
    position: PlayersTable.position,
    role: PlayersTable.role,
    bats: PlayersTable.bats,
    contact: PlayersTable[`batting_ratings_${split}_contact`],
    gap: PlayersTable[`batting_ratings_${split}_gap`],
    power: PlayersTable[`batting_ratings_${split}_power`],
    eye: PlayersTable[`batting_ratings_${split}_eye`],
    strikeouts: PlayersTable[`batting_ratings_${split}_strikeouts`],
  }).from(PlayersTable).where(
    and(
      eq(PlayersTable.team_id, team_id),
      eq(PlayersTable.roster, roster),
      gte(PlayersTable.position, 2),
      lte(PlayersTable.position, 10),
    ),
  ).orderBy(asc(PlayersTable.position))
})
