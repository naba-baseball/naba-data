export default defineEventHandler(async () => {
  return useSqlite().selectFrom('teams').selectAll().execute()
})
