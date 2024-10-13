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
  const db = useDB()
  const [{ count: rowCount }] = await db.selectFrom('players')
    .select(sql<number>`count(*)`.as('count'))
    .where('team_id', '=', team_id)
    .where('roster', '=', roster)
    .where('position', '=', 1)
    .execute()
  setHeader(event, 'X-Total-Count', rowCount)
  return db.selectFrom('players as p')
    .innerJoin('players_pitching as pi', 'p.player_id', 'pi.player_id')
    .where('p.team_id', '=', team_id)
    .where('p.roster', '=', roster)
    .where('p.position', '=', 1)
    .select([
      'p.player_id',
      'p.first_name',
      'p.last_name',
      'p.age',
      'p.position',
      'p.role',
      'p.throws',
      'pi.pitching_ratings_misc_stamina as stamina',
      `pi.pitching_ratings_${split}_stuff as stuff`,
      `pi.pitching_ratings_${split}_movement as movement`,
      `pi.pitching_ratings_${split}_control as control`,
    ])
    .execute()
})
