export default defineEventHandler(async (event) => {
  const { teamId } = await getValidatedRouterParams(
    event,
    parseNumeric('teamId'),
  )
  const res = await useDB()
    .selectFrom('teams')
    .selectAll()
    .where('team_id', '=', teamId)
    .executeTakeFirst()
  return res
})
