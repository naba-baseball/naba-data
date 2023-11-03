export default eventHandler(async (event) => {
  const playerId = Number(getRouterParam(event, 'playerId'))
  const db = useDB().db('ratings')
  return await db.collection('players').findOne({ player_id: playerId })
})
