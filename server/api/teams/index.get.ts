import { object } from 'valibot'

export default defineEventHandler(async (event) => {
  try {
    const cursor = useDB().db('ratings').collection('teams').find({ team_id: { $gt: 0 } }, { projection: { team_id: 1, name: 1, abbr: 1, nickname: 1 } }).limit(100)
    const teams = []
    for await (const team of cursor)
      teams.push(team)
    return teams
  }
  catch (err) {
    return err
  }
})
