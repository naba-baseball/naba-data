export default oauthDiscordEventHandler({
  config: {
    scope: ['identify'],
  },
  async onSuccess(event, result) {
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
