import { eq } from 'drizzle-orm'
import { Argon2id } from 'oslo/password'

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  if (user)
    return createError({ message: 'Already logged in', status: 400 })
  const body = await validateUsernameAndPassword()
  const { password, username } = body
  const db = useSqlite()
  const [existingUser] = await db.select().from(usersTable).where(eq(usersTable.username, username))
  if (existingUser)
    return createError({ message: 'Username is not available', status: 400 })
  const hashedPassword = await new Argon2id().hash(password)

  const userId = crypto.randomUUID()
  await db.insert(usersTable).values({ id: userId, username, password: hashedPassword, role: 'user' })
  await replaceUserSession(event, { user: { id: userId, username, role: 'guest' } })
})
