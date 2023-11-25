import { findAll } from '../services/teams.service.js'

export default defineEventHandler(async () => {
  return await findAll()
})
