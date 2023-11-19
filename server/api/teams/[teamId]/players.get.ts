import { coerce, number, object, optional, parse } from 'valibot'

const Schema = object({
  ...createPaginationSchema(),
  position: optional(coerce(number(), Number)),
})

export default defineEventHandler(async (event) => {
  const teamId = Number(getRouterParam(event, 'teamId'))
  const query: Record<string, any> = { team_id: teamId, retired: 0 }
  let params
  try {
    params = parse(Schema, getQuery(event))
  }
  catch (err) {
    return createError({ statusCode: 400, statusMessage: 'Bad Request', data: err })
  }
  const { position, limit, skip } = params
  if (position)
    query.position = position
  const db = useDB()
  const total = await db.players.count()
  setResponseHeader(event, 'X-Total-Count', total)
  return await db.players.findMany({ where: { position }, take: limit, skip })
})
