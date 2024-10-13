export default defineEventHandler(async (event) => {
  const user = await $fetch('/api/signup', {
    method: 'POST',
    body: await readRawBody(event),
  })
  if (!user) {
    throw createError({ message: `Error creating user ${user}`, status: 500 })
  }
  const db = useSqlite()
  await db.updateTable('users').set({ role: 'admin' }).where(
    'id',
    '=',
    user.id,
  ).execute()
  await replaceUserSession(event, {
    user: { username: user.username, id: user.id, role: 'admin' },
  })
  return 'ok'
})
