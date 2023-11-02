export default eventHandler(async (event) => {
  const redis = useStorage('redis')
  const playerId = getRouterParam(event, 'playerId')
  return await redis.getItem(`pitching:${playerId}`)
})
