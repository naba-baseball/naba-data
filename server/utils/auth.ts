import { Lucia  } from 'lucia'
import type { EventHandler, EventHandlerRequest } from 'h3'
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'
import { minLength, object, parse, required, string } from 'valibot'
import type { AuthRole } from '~~/types/auth.js'

export function authenticatedEventHandler<T extends EventHandlerRequest, D>(handler: EventHandler<T, D>, role?: AuthRole): EventHandler<T, D> {
  return defineEventHandler<T>(async (event) => {
    try {
      const sessionId = getCookie(event, 'auth_session')
      if (!sessionId)
        return createError({ message: 'no sess', status: 401 })
      const { session, user } = await useLucia().validateSession(sessionId)
      event.context.user = user
      event.context.session = session
      if (!user)
        return createError({ message: 'no user', status: 401 })
      if (!session)
        return createError({ message: 'no sess', status: 401 })
      if (role) {
        if (user?.role !== role)
          return createError({ message: 'Unauthorized', status: 401 })
      }

      const response = await handler(event)
      return { response }
    }
    catch (err) {
      if (err instanceof Error)
        throw err
      // Error handling
    }
  })
}

export function useLucia() {
  const adapter = new DrizzleSQLiteAdapter(useSqlite(), sessionsTable, usersTable)

  return new Lucia(adapter, {
    sessionCookie: {
      attributes: {
        secure: !import.meta.dev,
      },
    },
    getUserAttributes: (attributes) => {
      return {
        // attributes has the type of DatabaseUserAttributes
        username: attributes.username,
        role: attributes.role,
      }
    },
  })
}
declare module 'lucia' {
  interface Register {
    Lucia: ReturnType<typeof useLucia>
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  username: string
  role: AuthRole
}

export async function validateUsernameAndPassword() {
  const body = await readValidatedBody(useEvent(), body =>
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
  return body
}
