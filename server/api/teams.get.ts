import { gt, sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  return await useDB().select().from(teamsSchema).where(gt(teamsSchema.teamId, 0))
})
