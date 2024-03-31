export default eventHandler(async (event) => {
  const sessionId = getCookie(event, "auth_session");
  if (!sessionId) {
    throw createError({
      statusCode: 403,
    });
  }
  const lucia = useLucia();
  const { session, user } = await lucia.validateSession(sessionId);
  await lucia.invalidateUserSessions(user?.id);
  await lucia.invalidateSession(sessionId);
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createBlankSessionCookie().serialize(),
  );
});
