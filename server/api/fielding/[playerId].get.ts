export default eventHandler(async (event) => {
  const playerId = Number(getRouterParam(event, 'playerId'))
  return await useDB().players_fielding.findFirst({ where: { player_id: { equals: playerId } } })
})
