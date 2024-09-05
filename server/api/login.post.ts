import { Argon2id } from 'oslo/password'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { username, password } = await validateUsernameAndPassword()
  const db = useSqlite()
  const [existingUser] = await db
    .select({ password: usersTable.password, id: usersTable.id, role: usersTable.role, username: usersTable.username })
    .from(usersTable)
    .where(eq(usersTable.username, username))
  if (!existingUser) {
    return createError({
      message: 'Invalid username or password',
      status: 401,
    })
  }
  const verifiedPassword = await new Argon2id().verify(
    existingUser.password,
    password,
  )
  if (!verifiedPassword) {
    return createError({
      message: 'Invalid username or password',
      status: 401,
    })
  }
  await replaceUserSession(event, { user: {
    id: existingUser.id,
    username: existingUser.username,
    role: existingUser.role as AuthRole,
  } })
})
