export default eventHandler(async (event) => {
  const body = (await readBody(event)) as { name: string; value: string };
  setCookie(event, body.name, body.value);
  return "ok";
});
