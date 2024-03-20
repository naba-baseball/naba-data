import { eq } from "drizzle-orm";
import { teams } from "~/server/drizzle/schema.js";

export default defineEventHandler(async (event) => {
  const { teamId } = await getValidatedRouterParams(
    event,
    parseNumeric("teamId"),
  );
  const db = useSQLite();
  return await db.select({
    team_id: teams.team_id,
    name: teams.name,
    nickname: teams.nickname,
  }).from(teams).where(eq(teams.team_id, teamId)).get()
  
});
