export default oauthDiscordEventHandler({
  config: {
    scope: ['identify'],
  },
  async onSuccess(event, result) {
    const adminIds = useRuntimeConfig(event).adminUsers.split(':')
    if (adminIds.includes(result.user.id)) {
      await setUserSession(event, {
        user: {
          role: 'admin',
          username: result.user.username,
          id: result.user.id,
        },
      })
      return sendRedirect(event, '/')
    }
    await setUserSession(event, {
      user: {
        role: 'guest',
        username: result.user.username,
        id: result.user.id,
      },
    })
    return sendRedirect(event, '/')
  },
})
