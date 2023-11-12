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
  const cursor = db.db('ratings').collection('players')
    .find<Player>(query, { projection:
        { first_name: 1, last_name: 1, position: 1, role: 1, age: 1, player_id: 1 } })
    .limit(limit)
    .skip(skip)
  setResponseHeader(event, 'X-Total-Count', await db.db('ratings').collection('players').countDocuments(query))
  const players = []
  for await (const player of cursor)
    players.push(player)

  return players
})
