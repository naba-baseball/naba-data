import { eq } from "drizzle-orm";
import {
  playersBatting,
  playersFielding,
  playersPitching,
} from "~/server/drizzle/schema.js";
export default defineTask({
  meta: {
    name: "db:scale",
    description: "scale ratings tables",
  },
  async run() {
    console.log("scaling ratings tables");
    await scaleTable(playersBatting);
    await scaleTable(playersPitching);
    await scaleTable(playersFielding);
    return {
      result:
        "scaled players_batting, players_pitching, and players_fielding tables.",
    };
  },
});

async function scaleTable(
  schema: any,
) {
  const db = useSQLite();
  const keys = Object.keys(schema).filter((key) => key.includes("ratings"));
  const all = await db.select().from(schema);
  const ops = all.map((stat) => {
    const updated = keys.reduce((acc, key) => {
      acc[key] = scaleRatings(stat[key]);
      return acc;
    }, {});
    // console.log('updated', updated)
    return db.update(schema).set(updated).where(
      eq(schema.player_id, stat.player_id),
    );
  });
  await db.batch(ops);
}
