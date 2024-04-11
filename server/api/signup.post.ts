import { Argon2id } from 'oslo/password'
import {
  minLength,
  object,
  parse,
  required,
  string,
} from 'valibot'
import { ObjectId } from 'mongodb'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, body =>
    parse(
      required(
        object({
          username: string([
            minLength(3, 'Username must be 3 characters or more'),
          ]),
          password: string([
            minLength(6, 'Password must be 6 characters or more'),
          ]),
        }),
      ),
      body,
    ))
  const { password, username } = body
  const hashedPassword = await new Argon2id().hash(password)
  const userId = new ObjectId()
  const db = useDB().db('ratings')
  const existingUser = await db.collection('users').findOne({ username })
  if (existingUser)
    return createError({ message: 'Username is not available', status: 400 })

  await db.collection('users').insertOne({
    _id: userId.toString(),
    user_id: userId.toString(),
    username,
    password: hashedPassword,
    role: '',
  })
  const lucia = useLucia()
  const session = await lucia.createSession(userId.toString(), {})
  appendHeader(
    event,
    'Set-Cookie',
    lucia.createSessionCookie(session.id).serialize(),
  )
})
