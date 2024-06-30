export default eventHandler(async (event) => {
  console.log('GET /api/user')
  const lucia = useLucia()
  const sessionId = getCookie(event, 'auth_session')
  if (!sessionId) {
    appendHeader(
      event,
      'Set-Cookie',
      lucia.createBlankSessionCookie().serialize(),
    )
    return { role: 'guest' }
  }
  return (await lucia.validateSession(sessionId)).user ?? undefined
})
