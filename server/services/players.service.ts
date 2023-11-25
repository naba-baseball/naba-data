import { and, eq } from 'drizzle-orm'
import { playersSchema, useDB } from '#imports'

const db: ReturnType<typeof useDB> = useDB()

export async function findById(playerId: number) {
  return (await db.select().from(playersSchema).where(eq(playersSchema.playerId, playerId))).map(scaleObject)[0]
}

interface findByTeamOptions {
  position?: number | unknown
  limit?: number
  skip?: number
}
export async function findByTeam(teamId: number, options: findByTeamOptions) {
  const positionQuery = () => {
    if (typeof options.position === 'number')
      return eq(playersSchema.position, options.position)
  }

  const data = await db.select()
    .from(playersSchema)
    .where(
      and(
        eq(playersSchema.teamId, teamId),
        positionQuery(),
      ),
    )
    .orderBy(playersSchema.position)
    .limit(options.limit || 0).offset(options.skip || 0)
  return data
}

export async function findPitchingRatings(playerId: number) {
  const data = await db.select()
    .from(playersPitchingSchema)
    .where(eq(playersPitchingSchema.playerId, playerId))
  return data.map(scaleObject)[0]
}

export async function findBattingRatings(playerId: number) {
  const data = await db.select()
    .from(playersBattingSchema)
    .where(eq(playersBattingSchema.playerId, playerId))
  return data.map(scaleObject)[0]
}

export async function findFieldingRatings(playerId: number) {
  const data = await db.select()
    .from(playersFieldingSchema)
    .where(eq(playersFieldingSchema.playerId, playerId))
  return data.map(scaleObject)[0]
}
