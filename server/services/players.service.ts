import { useDB } from '#imports'

const db = useDB().db('ratings')

export function fromPlayers() {
  return db.collection('players')
}
export async function findById(playerId: number) {
  return await fromPlayers().findOne({ player_id: playerId })
}

interface findByTeamOptions {
  position?: number | 'batters' | unknown
  limit?: number
  skip?: number
}
export async function findByTeam(teamId: number, options: findByTeamOptions) {
  let position = options.position
  if (position === 'pitchers')
    position = { $lte: 1 }
  else
    if (position === 'batters')
      position = { $gte: 2, $lte: 8 }
    else position = Number(position)
  const data = await fromPlayers().find({
    team_id: teamId,
    position: position || undefined,
  }).sort({ position: 1 }).limit(options.limit || 0).skip(options.skip || 0).toArray()
  return data
}
