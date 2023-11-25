import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const teamId = Number(getRouterParam(event, 'teamId'))
  const data = (await useDB().select().from(teamsSchema).where(eq(teamsSchema.teamId, teamId)))[0]
  return { data }
})
