import { findBattingRatings } from '~/server/services/players.service.js'

export default eventHandler(async (event) => {
  const playerId = Number(getRouterParam(event, 'playerId'))
  return await findBattingRatings(playerId)
})
