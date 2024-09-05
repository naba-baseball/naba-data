import { eq } from 'drizzle-orm'

export default defineNitroPlugin(() => {
  // Called when the session is fetched during SSR for the Vue composable (/api/_auth/session)
  // Or when we call useUserSession().fetch()
  sessionHooks.hook('fetch', async (session, event) => {
    if (!session?.user?.username)
      throw createError({ message: 'Unauthorized', status: 401 })
    const db = useSqlite()
    const [existingUser] = await db
      .select({ id: usersTable.id, role: usersTable.role, username: usersTable.username })
      .from(usersTable)
      .where(eq(usersTable.username, session.user.username))
    session.user = {
      username: existingUser.username,
      role: existingUser.role as AuthRole,
      id: existingUser.id,
    }
    // extend User Session by calling your database
    // or
    // throw createError({ ... }) if session is invalid for example
  })

  // Called when we call useUserSession().clear() or clearUserSession(event)
  sessionHooks.hook('clear', async (session, event) => {
    // Log that user logged out
  })
})
