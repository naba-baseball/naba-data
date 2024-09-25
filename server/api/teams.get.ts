export default defineEventHandler(async (event) => {
  return await useSqlite(event).select().from(TeamsTable)
})
