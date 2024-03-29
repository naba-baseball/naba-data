export default defineEventHandler(async (event) => {
  const { teamId } = await getValidatedRouterParams(
    event,
    parseNumeric("teamId"),
  );
  const db = useDB().db("ratings");
  return await db.collection("teams").findOne<{
    team_id: number;
    name: string;
    nickname: string;
    roster: unknown[];
  }>(
    { team_id: teamId },
    {
      projection: {
        team_id: 1,
        name: 1,
        nickname: 1,
        primary_roster: 1,
        logo_file_name:1
      },
    },
  );
});
