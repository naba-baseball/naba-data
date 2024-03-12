import { eq } from "drizzle-orm";
import { teams } from "../drizzle/schema.js";

export default defineEventHandler(async () => {
  const db = useSQLite();
  return db.select({
    team_id: teams.team_id,
    name: teams.name,
    nickname: teams.nickname,
    logo_file_name: teams.logo_file_name,
  }).from(teams).where(eq(teams.allstar_team, 0)).orderBy(teams.name);
});
