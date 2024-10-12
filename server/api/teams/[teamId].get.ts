export default defineEventHandler(async (event) => {
  const { teamId } = await getValidatedRouterParams(
    event,
    parseNumeric('teamId'),
  )
  const res = await useSqlite()
    .selectFrom('teams')
    .selectAll()
    .where('team_id', '=', teamId)
    .execute()
  return res
})
