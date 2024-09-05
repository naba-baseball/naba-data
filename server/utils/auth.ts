import { Lucia } from 'lucia'
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'
import type { AuthRole } from '~~/types/auth.js'

export async function checkRole(role?: AuthRole) {
  if (!role)
    throw createError({ message: `role not found: ${role}`, status: 401 })
  const event = useEvent()
  const sessionId = getCookie(event, 'auth_session')
  if (!sessionId)
    throw createError({ message: 'no sess', status: 401 })
  const { session, user } = await useLucia().validateSession(sessionId)
  if (!user)
    throw createError({ message: 'no user', status: 401 })
  if (!session)
    throw createError({ message: 'no session', status: 401 })
  if (role && user.role !== role)
    throw createError({ message: 'Unauthorized', status: 401 })

  return { user, session }
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
