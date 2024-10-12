export default defineNitroPlugin(() => {
  // Called when the session is fetched during SSR for the Vue composable (/api/_auth/session)
  // Or when we call useUserSession().fetch()
  sessionHooks.hook('fetch', async (session, event) => {
    if (!session?.user?.username)
      throw createError({ message: 'Unauthorized', status: 401 })
    const db = useSqlite()
    const [existingUser] = await db
      .selectFrom('users')
      .select(['id', 'role', 'username'])
      .where('username', '=', session.user.username)
      .execute()
    if (!existingUser) {
      clearUserSession(event)
      session.user = undefined
      throw createError({ message: 'User not found', status: 404 })
    }
    else {
      session.user = {
        username: existingUser.username,
        role: existingUser.role as AuthRole,
        id: existingUser.id,
      }
    }
    // extend User Session by calling your database
    // or
    // throw createError({ ... }) if session is invalid for example
  })

  // Called when we call useUserSession().clear() or clearUserSession(event)
  sessionHooks.hook('clear', async () => {
    // Log that user logged out
  })
})
