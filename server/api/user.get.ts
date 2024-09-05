export default eventHandler(async (event) => {
  const { user } = await getUserSession(event)
  if (!user) {
    return await setUserSession(event, { user: { role: 'guest', username: 'guest', id: '' } })
  }
  return user
})
