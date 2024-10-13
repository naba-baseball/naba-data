import { Argon2id } from 'oslo/password'

export default defineEventHandler(async (event) => {
  const { username, password } = await validateUsernameAndPassword()
  const db = useSqlite()
  const [existingUser] = await db
    .selectFrom('users')
    .select(['password', 'id', 'role', 'username'])
    .where('username', '=', username)
    .execute()
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
  await replaceUserSession(event, {
    user: {
      id: existingUser.id,
      username: existingUser.username,
      role: existingUser.role as AuthRole,
    },
  })
})
