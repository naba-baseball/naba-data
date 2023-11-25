import { findFieldingRatings } from '~/server/services/players.service.js'

export default eventHandler(async (event) => {
  const playerId = Number(getRouterParam(event, 'playerId'))
  return findFieldingRatings(playerId)
})
