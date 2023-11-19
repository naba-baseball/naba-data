export default eventHandler(async (event) => {
  const playerId = Number(getRouterParam(event, 'playerId'))
  return await useDB().players_batting.findFirst({ where: { player_id: { equals: playerId } } })
})
