import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const user = await $fetch('/api/signup', {
    method: 'POST',
    body: await readRawBody(event),
  })
  if (!user)
    throw createError({ message: `Error creating user ${user}`, status: 500 })
  const db = useSqlite()
  await db.update(usersTable).set({ role: 'admin' }).where(eq(usersTable.id, user.id))
  await replaceUserSession(event, { user: { username: user.username, id: user.id, role: 'admin' } })
  return 'ok'
})
