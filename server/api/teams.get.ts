import { drizzle } from 'db0/integrations/drizzle/index'

export default defineEventHandler(async () => {
  const db = useDatabase()
  return await drizzle(db).select()
    .from(TeamsTable)
})
