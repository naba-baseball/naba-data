export default defineEventHandler(async (event) => {
  const teamId = Number(getRouterParam(event, 'teamId'))
  return await useDB().teams.findFirst({ where: { team_id: { equals: teamId } } })
})
