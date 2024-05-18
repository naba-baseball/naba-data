import { object, parse } from 'valibot'
import { parseTeamId } from '~/server/utils/parsers.js'

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
  const db = useDB().db('ratings')
  return await db
    .collection('players')
    .find({
      team_id,
      position: { $in: [1] },
      roster,
    })
    .sort({ role: 1 })
    .project<Player & { pitching: Record<PitchingRating, number>, throws: number }>({
      _id: 1,
      player_id: 1,
      first_name: 1,
      last_name: 1,
      team_id: 1,
      age: 1,
      role: 1,
      throws: 1,
      pitching: `$pitching.${split}`,
    })
    .toArray()
})
