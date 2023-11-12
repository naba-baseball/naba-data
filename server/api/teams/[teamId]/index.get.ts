export default defineEventHandler(async (event) => {
  const teamId = Number(getRouterParam(event, 'teamId'))
  if (Number.isNaN(teamId))
    return createError({ statusCode: 400, statusMessage: 'Bad Request', data: 'Invalid teamId' })
  const db = useDB()
  const cursor = await db.db('ratings').collection('teams')
    .findOne({ team_id: teamId }, { projection:
        { team_id: 1, name: 1, abbr: 1, nickname: 1 } })
  return cursor
})
