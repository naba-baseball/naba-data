import { drizzle } from 'db0/integrations/drizzle/index'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { teamId } = await getValidatedRouterParams(
    event,
    parseNumeric('teamId'),
  )
  return (await drizzle(useDatabase()).select().from(TeamsTable).where(
    eq(TeamsTable.team_id, teamId),
  ))[0]
})
