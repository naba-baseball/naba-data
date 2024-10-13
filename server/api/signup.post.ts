import { Argon2id } from 'oslo/password'

export default defineEventHandler(async (event) => {
  const { user } = await getUserSession(event)
  if (user)
    return createError({ message: 'Already logged in', status: 400 })
  const body = await validateUsernameAndPassword()
  const { password, username } = body
  const db = useDB()
  const [existingUser] = await db.selectFrom('users').select('username').where('username', '=', username).execute()
  if (existingUser)
    return createError({ message: 'Username is not available', status: 400 })
  const hashedPassword = await new Argon2id().hash(password)

  const userId = crypto.randomUUID()
  await db.insertInto('users').values({ id: userId, username, password: hashedPassword, role: 'guest' }).execute()
  await replaceUserSession(event, { user: { id: userId, username, role: 'guest' } })
  return { id: userId, username, role: 'guest' }
})
