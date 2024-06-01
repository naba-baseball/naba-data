import { object, parse } from 'valibot'
import { parseTeamId } from '~/server/utils/parsers.js'
import type { BattingRating, Player } from '~/types/index.js'

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
    .collection<Player & { batting: Record<BattingRating, number>, bats: number }>('players')
    .find({
      team_id,
      position: { $gte: 2, $lte: 8 },
      roster,
    })
    .sort({ position: 1 })
    .project<Player & { batting: Record<BattingRating, number>, bats: number }>({
      _id: 1,
      player_id: 1,
      first_name: 1,
      last_name: 1,
      position: 1,
      team_id: 1,
      age: 1,
      role: 1,
      bats: 1,
      batting: `$batting.${split}`,
    })
    .toArray()
})
