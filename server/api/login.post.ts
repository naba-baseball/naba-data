import { object, parse, required, string } from 'valibot'
import { Argon2id } from 'oslo/password'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { username, password } = await readValidatedBody(event, body =>
    parse(
      required(
        object({
          username: string(),
          password: string(),
        }),
      ),
      body,
    ))
  const db = useSqlite()
  const [existingUser] = await db
    .select({ password: usersTable.password, id: usersTable.id })
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
  const lucia = useLucia()
  const session = await lucia.createSession(existingUser.id, {})
  appendHeader(event, 'Set-Cookie', lucia.createSessionCookie(session.id).serialize())
})
