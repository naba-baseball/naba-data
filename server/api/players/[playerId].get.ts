import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const playerId = Number(getRouterParam(event, 'playerId'))
  return (await useDB().select().from(playersSchema).where(eq(playersSchema.playerId, playerId))).map(scaleObject)[0]
})
