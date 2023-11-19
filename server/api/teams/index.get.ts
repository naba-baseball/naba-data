export default defineEventHandler(async (event) => {
  return await useDB().teams.findMany({ where: { team_id: { gt: 0 } } })
})
