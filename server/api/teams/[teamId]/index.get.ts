import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const teamId = Number(getRouterParam(event, 'teamId'))
  return (await useDB().select().from(teamsSchema).where(eq(teamsSchema.teamId, teamId)))[0]
})
