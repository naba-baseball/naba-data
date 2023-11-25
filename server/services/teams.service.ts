import { eq, gt } from 'drizzle-orm'
import { teamsSchema, useDB } from '#imports'

const db = useDB()
export async function findAll() {
  return await db.select().from(teamsSchema).where(gt(teamsSchema.teamId, 0))
}
export async function findById(teamId: number) {
  return (await db.select().from(teamsSchema).where(eq(teamsSchema.teamId, teamId)))[0]
}
