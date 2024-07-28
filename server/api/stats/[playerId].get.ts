import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const db = useSqlite()
  const playerId = Number(getRouterParam(event, 'playerId'))
  const player = db.select().from(PlayersTable)
    .where(eq(PlayersTable.player_id, playerId))
    .limit(1)
    .as('player')
  const data = await db.select().from(PlayerCareerBattingStats)
    .where(eq(PlayerCareerBattingStats.player_id, playerId))
    .leftJoin(player, eq(player.player_id, PlayerCareerBattingStats.player_id))
  return data
})
