export default defineEventHandler(async () => {
  return await useSqlite().select().from(TeamsTable)
})
