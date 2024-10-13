export default defineEventHandler(async (event) => {
  const db = useDB()
  const playerId = Number(getRouterParam(event, 'playerId'))
  const playerData = await db.selectFrom('players')
    .selectAll()
    .where('player_id', '=', playerId)
    .execute()

  if (!playerData.length) {
    throw createError({ message: 'Player not found', statusCode: 404 })
  }

  return playerData[0]
})
