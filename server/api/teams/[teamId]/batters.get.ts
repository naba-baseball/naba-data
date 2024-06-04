import { object, parse } from 'valibot'
import { and, asc, eq, gte, lte } from 'drizzle-orm'
import { parseTeamId } from '~/server/utils/parsers.js'
import { useSqlite } from '~/server/utils/sqlite.js'

export default defineEventHandler(async (event) => {
  const { teamId: team_id } = await getValidatedRouterParams(
    event,
    parseTeamId(),
  )
  const { split, roster } = await getValidatedQuery(event, data =>
    parse(
      object({
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
      lte(PlayersTable.position, 8),
    ),
  ).orderBy(asc(PlayersTable.position))
})
