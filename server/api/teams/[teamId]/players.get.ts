import { eq, sql } from 'drizzle-orm'
import { coerce, object, optional, parse, union, unknown } from 'valibot'
import { findBattingRatings, findByTeam, findFieldingRatings, findPitchingRatings, fromPlayers } from '@/server/services/players.service.js'

const Schema = object({
  ...paginationSchema,
  position: optional(
    union(
      [coerce(selectPlayersSchema.entries.position, Number), unknown()],
    ),
  ),
})

export default defineEventHandler(async (event) => {
  const teamId = Number(getRouterParam(event, 'teamId'))
  const query = getQuery(event)
  let params
  try {
    params = parse(Schema, query)
  }
  catch (err) {
    return createError({ statusCode: 400, statusMessage: 'Bad Request', data: err })
  }
  const { position, limit, skip } = params
  const [{ count }] = await fromPlayers({ count: sql<number>`count(${playersSchema.playerId})` }).where(eq(playersSchema.teamId, teamId))
  let data = await findByTeam(teamId, { position, limit, skip })
  data = await Promise.all(data.map(async (player) => {
    const pitching = await findPitchingRatings(player.playerId)
    const batting = await findBattingRatings(player.playerId)
    const fielding = await findFieldingRatings(player.playerId)
    return { ...player, pitching, batting, fielding }
  }))
  return { data, meta: { count } }
})
