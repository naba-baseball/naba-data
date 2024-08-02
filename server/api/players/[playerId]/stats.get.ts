import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const db = useSqlite()
  const playerId = Number(getRouterParam(event, 'playerId'))
  const statsData = await db.select().from(PlayerCareerBattingStats)
    .where(eq(PlayerCareerBattingStats.player_id, playerId))
  if (!statsData.length) {
    throw createError({ message: 'Stats not found', statusCode: 404 })
  }
  return statsData
})
