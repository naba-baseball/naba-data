import * as v from 'valibot'
import { and, asc, count, desc, eq, gte, lte, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { teamId: team_id } = await getValidatedRouterParams(
    event,
    parseTeamId(),
  )
  const { split, roster, limit, offset, sortBy: [sortByCol, sortByDir] } = await getValidatedQuery(event, data =>
    v.parse(
      v.object({
        roster: parseRoster(),
        split: parseSplit(),
        ...paginationSchema,
      }),
      data,
    ))
  const sortingFn = sortByDir === 'asc' ? asc : desc
  const db = useSqlite()
  const [{ count: rowCount }] = await db.select({ count: count() }).from(PlayersTable)
    .where(
      and(
        eq(PlayersTable.team_id, team_id),
        eq(PlayersTable.roster, roster),
        gte(PlayersTable.position, 2),
        lte(PlayersTable.position, 10),
      ),
    )
  setHeader(event, 'X-Total-Count', rowCount)
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
  }).from(PlayersTable)
    .where(
      and(
        eq(PlayersTable.team_id, team_id),
        eq(PlayersTable.roster, roster),
        gte(PlayersTable.position, 2),
        lte(PlayersTable.position, 10),
      ),
    )
    .limit(limit)
    .offset(offset)
    .orderBy(sortingFn(PlayersTable[sortByCol] ?? PlayersTable.position))
})
