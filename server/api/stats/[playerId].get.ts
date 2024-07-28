import { and, eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const db = useSqlite()
  const playerId = Number(getRouterParam(event, 'playerId'))
  const data = await db.select().from(PlayerCareerBattingStats)
    .leftJoin(PlayersTable, eq(PlayerCareerBattingStats.player_id, PlayersTable.player_id))
    .where(eq(PlayerCareerBattingStats.player_id, playerId))

  return data
})
