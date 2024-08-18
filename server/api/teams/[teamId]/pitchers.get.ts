import { and, asc, count, desc, eq } from 'drizzle-orm'
import * as v from 'valibot'

export default defineEventHandler(async (event) => {
  const { teamId: team_id } = await getValidatedRouterParams(
    event,
    parseTeamId(),
  )

  const { split, roster, limit, offset, orderBy: [orderCol, orderDir] } = await getValidatedQuery(event, data =>
    v.parse(
      v.object({
        roster: parseRoster(),
        split: parseSplit(),
        ...paginationSchema,
      }),
      data,
    ))
  const sortingFn = orderDir === 'asc' ? asc : desc
  const db = useSqlite()
  const [{ count: rowCount }] = await db.select({ count: count() }).from(PlayersTable)
    .where(
      and(
        eq(PlayersTable.team_id, team_id),
        eq(PlayersTable.roster, roster),
        eq(PlayersTable.position, 1),
      ),
    )
  setHeader(event, 'X-Total-Count', rowCount)
  return db.select({
    player_id: PlayersTable.player_id,
    first_name: PlayersTable.first_name,
    age: PlayersTable.age,
    last_name: PlayersTable.last_name,
    position: PlayersTable.position,
    role: PlayersTable.role,
    throws: PlayersTable.throws,
    stuff: PlayersTable[`pitching_ratings_${split}_stuff`],
    movement: PlayersTable[`pitching_ratings_${split}_movement`],
    control: PlayersTable[`pitching_ratings_${split}_control`],
  }).from(PlayersTable)
    .where(
      and(
        eq(PlayersTable.team_id, team_id),
        eq(PlayersTable.roster, roster),
        eq(PlayersTable.position, 1),
      ),
    )
    .limit(limit)
    .offset(offset)
    .orderBy(sortingFn(PlayersTable[orderCol] ?? PlayersTable.position))
})
