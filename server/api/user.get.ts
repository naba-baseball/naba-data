export default eventHandler(async (event) => {
  const lucia = useLucia();
  const sessionId = getCookie(event, "auth_session");
  if (!sessionId) {
    appendHeader(
      event,
      "Set-Cookie",
      lucia.createBlankSessionCookie().serialize(),
    );
    return null;
  }
  return (await lucia.validateSession(sessionId)).user ?? null
});
