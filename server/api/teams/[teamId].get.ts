import { findById } from '~/server/services/teams.service.js'

export default defineEventHandler(async (event) => {
  const teamId = Number(getRouterParam(event, 'teamId'))
  const data = await findById(teamId)
  return { data }
})
