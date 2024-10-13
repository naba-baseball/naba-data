export default defineEventHandler(async () => {
  return useDB().selectFrom('teams').selectAll().execute()
})
