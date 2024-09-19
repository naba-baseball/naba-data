import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const db = useSqlite()
  const playerId = Number(getRouterParam(event, 'playerId'))
  const playerData = await db.select().from(PlayersTable).where(eq(PlayersTable.player_id, playerId))

  if (!playerData.length) {
    throw createError({ message: 'Player not found', statusCode: 404 })
  }

  return playerData[0]
})
