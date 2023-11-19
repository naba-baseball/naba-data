export default eventHandler(async (event) => {
  const playerId = Number(getRouterParam(event, 'playerId'))
  return await useDB().players.findFirst({ where: { player_id: { equals: playerId } } })
})
