import { coerce, object, optional, parse, string, union, unknown } from 'valibot'
import { findByTeam, fromPlayers } from '@/server/services/players.service.js'

const Schema = object({
  ...paginationSchema,
  position: optional(
    union(
      [coerce(string(), Number), unknown()],
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
  const [{ count }] = await fromPlayers().aggregate(
    [
      { $match: { team_id: { $eq: teamId } } },
      { $count: 'count' },
    ],
  ).toArray()
  const data = await findByTeam(teamId, { position, limit, skip })
  return { data, meta: { count } }
})
