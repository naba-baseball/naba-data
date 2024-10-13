export default defineEventHandler(async (event) => {
  const db = useSqlite()
  const playerId = Number(getRouterParam(event, 'playerId'))
  const statsData = await db.selectFrom('players_career_batting')
    .selectAll()
    .where('player_id', '=', playerId)
    .execute()
  if (!statsData.length) {
    throw createError({ message: 'Stats not found', statusCode: 404 })
  }
  return statsData
})
