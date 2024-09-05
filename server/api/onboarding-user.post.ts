import { eq } from 'drizzle-orm'
import { generateIdFromEntropySize } from 'lucia'
import { Argon2id } from 'oslo/password'

export default defineEventHandler(async (event) => {
  const { password, username } = await validateUsernameAndPassword()
  const hashedPassword = await new Argon2id().hash(password)
  const db = useSqlite()
  const [existingUser] = await db.select().from(usersTable).where(eq(usersTable.username, username))
  if (existingUser)
    return createError({ message: 'Username is not available', status: 400 })

  const userId = generateIdFromEntropySize(16)
  await db.insert(usersTable).values({ id: userId, username, password: hashedPassword, role: 'admin' })

  const lucia = useLucia()
  const session = await lucia.createSession(userId, {})
  appendHeader(
    event,
    'Set-Cookie',
    lucia.createSessionCookie(session.id).serialize(),
  )
  return 'ok'
})
