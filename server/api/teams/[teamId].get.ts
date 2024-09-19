import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { teamId } = await getValidatedRouterParams(
    event,
    parseNumeric('teamId'),
  )
  const res = await useSqlite().select().from(TeamsTable).where(
    eq(TeamsTable.team_id, teamId),
  )
  return res[0]
})
