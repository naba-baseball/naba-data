import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await $fetch('/api/signup', {
    headers: getRequestHeaders(event),
    body: await readRawBody(event),
  })
  const { user } = await getUserSession(event)
  if (!user)
    throw createError({ message: 'Error creating user', status: 500 })
  const db = useSqlite()
  await db.update(usersTable).set({ role: 'admin' }).where(eq(usersTable.id, user.id))
  await replaceUserSession(event, { user: { ...user, role: 'admin' } })
  return 'ok'
})
