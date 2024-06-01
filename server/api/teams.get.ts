import type { Team } from '~/types/index.js'

export default defineEventHandler(async () => {
  const db = useDB().db('ratings')
  return db
    .collection('teams')
    .find({ team_id: { $gt: 0 }, allstar_team: 0 })
    .project<Team>({
      team_id: 1,
      name: 1,
      nickname: 1,
      logo_file_name: 1,
    })
    .sort({ name: 'asc' })
    .toArray()
})
