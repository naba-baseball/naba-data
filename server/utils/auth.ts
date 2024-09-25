import type { H3Event } from 'h3'

export async function checkRole(event: H3Event, role?: AuthRole) {
  if (!role)
    throw createError({ message: `role not found: ${role}`, status: 401 })
  const { user } = await getUserSession(event)
  if (!user)
    throw createError({ message: 'no session', status: 401 })
  if (role && user.role !== role)
    throw createError({ message: 'Unauthorized', status: 401 })

  return true
}
