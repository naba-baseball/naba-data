export default eventHandler(async (event) => {
  await runTask("db:delete");
  await runTask("db:migrate");
  await runTask("db:import");
  await runTask("db:scale");

  return "ok";
});
