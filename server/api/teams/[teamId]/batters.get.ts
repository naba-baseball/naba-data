import { sql } from 'kysely'
import * as v from 'valibot'

export default defineEventHandler(async (event) => {
  const { teamId: team_id } = await getValidatedRouterParams(
    event,
    parseTeamId(),
  )
  const { split, roster }
    = await getValidatedQuery(event, data =>
      v.parse(
        v.object({
          roster: parseRoster(),
          split: parseSplit(),
        }),
        data,
      ))
  const db = useSqlite()
  const [{ count: rowCount }] = await db.selectFrom('players')
    .select(sql<number>`count(*)`.as('count'))
    .where('team_id', '=', team_id)
    .where('roster', '=', roster)
    .where('position', '>=', 2)
    .where('position', '<=', 10)
    .execute()
  setHeader(event, 'X-Total-Count', rowCount)
  return db.selectFrom('players as p')
    .innerJoin('players_batting as b', 'p.player_id', 'b.player_id')
    .where('p.team_id', '=', team_id)
    .where('p.roster', '=', roster)
    .where('p.position', '>=', 2)
    .where('p.position', '<=', 10)
    .select([
      'p.player_id',
      'p.first_name',
      'p.last_name',
      'p.age',
      'p.position',
      'p.role',
      'p.bats',
      `b.batting_ratings_${split}_contact as contact`,
      `b.batting_ratings_${split}_gap as gap`,
      `b.batting_ratings_${split}_power as power`,
      `b.batting_ratings_${split}_eye as eye`,
      `b.batting_ratings_${split}_strikeouts as strikeouts`,
    ])
    .execute()
})
