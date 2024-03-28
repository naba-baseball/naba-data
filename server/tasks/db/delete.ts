import { sql } from "drizzle-orm";

export default defineTask({
  meta: {
    name: "db:delete",
    description: "delete database",
  },
  async run() {
    console.log("deleting");
    const db = useSQLite()
    await db.run(sql`DROP TABLE IF EXISTS players`)
    await db.run(sql`DROP TABLE IF EXISTS players_batting`)
    await db.run(sql`DROP TABLE IF EXISTS players_pitching`)
    await db.run(sql`DROP TABLE IF EXISTS players_fielding`)
    await db.run(sql`DROP TABLE IF EXISTS teams`)
    await db.run(sql`DROP TABLE IF EXISTS team_roster`)

    return { result: "deleted" };
  },
});
