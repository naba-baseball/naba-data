import { and, asc, eq } from 'drizzle-orm'
import { object, parse } from 'valibot'

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
  const res = await db.select({
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
  }).from(PlayersTable).where(
    and(
      eq(PlayersTable.team_id, team_id),
      eq(PlayersTable.roster, roster),
      eq(PlayersTable.position, 1),
    ),
  ).orderBy(asc(PlayersTable.position))
  return res
})
