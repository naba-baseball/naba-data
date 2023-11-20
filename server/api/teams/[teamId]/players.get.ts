import { and, eq, sql } from 'drizzle-orm'
import { coerce, object, optional, parse, union, unknown } from 'valibot'

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
  const db = useDB()
  const [{ count }] = await db
    .select({ count: sql<number>`count(${playersSchema.playerId})` })
    .from(playersSchema)
    .where(eq(playersSchema.teamId, teamId))
  setResponseHeader(event, 'X-Total-Count', count)
  const positionQuery = () => {
    if (typeof position === 'number')
      return eq(playersSchema.position, position)
  }
  return await db.select()
    .from(playersSchema)
    .where(
      and(
        eq(playersSchema.teamId, teamId),
        positionQuery(),
      ),
    )
    .orderBy(playersSchema.position)
    .limit(limit).offset(skip)
})
