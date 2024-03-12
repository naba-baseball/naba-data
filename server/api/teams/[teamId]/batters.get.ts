import { eq } from "drizzle-orm";
import { object, parse } from "valibot";
import { players, playersBatting } from "~/server/drizzle/schema.js";
export default defineEventHandler(async (event) => {
  const { teamId: team_id } = await getValidatedRouterParams(
    event,
    parseNumeric("teamId"),
  );

  const { split, roster } = await getValidatedQuery(event, (data) =>
    parse(
      object({
        roster: parseRoster(),
        split: parseSplit(),
      }),
      data,
    ));
  const db = useSQLite();
  const batting = db.select().from(playersBatting).where(
    eq(playersBatting.team_id, team_id),
  ).as("batting");
  return await db.select({
    player_id: players.player_id,
    first_name: players.first_name,
    last_name: players.last_name,
    position: players.position,
    team_id: players.team_id,
    age: players.age,
    role: players.role,
    bats: players.bats,
    batting: {
      [split]: {
        eye: batting[`batting_ratings_${split}_eye`],
        power: batting[`batting_ratings_${split}_power`],
        contact: batting[`batting_ratings_${split}_contact`],
        gap: batting[`batting_ratings_${split}_gap`],
        strikeouts: batting[`batting_ratings_${split}_strikeouts`],
      },
    },
  }).from(players).where(eq(players.team_id, team_id))
    .leftJoin(batting, eq(batting.player_id, players.player_id));
});
