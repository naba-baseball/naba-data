import { and, eq, gte, inArray, lte, not } from "drizzle-orm";
import { object, parse } from "valibot";
import {
  players,
  playersBatting,
  teamRoster,
} from "~/server/drizzle/schema.js";
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
  const rosterVal = roster === "primary" ? 2 : 1;
  const db = useSQLite();
  const batting = db.select().from(playersBatting).where(
    eq(playersBatting.team_id, team_id),
  ).as("batting");
  const playerRoster = db.select().from(teamRoster).where(
    and(eq(teamRoster.team_id, team_id), eq(teamRoster.list_id, rosterVal)),
  ).as("playerRoster");
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
      eye: batting[`batting_ratings_${split}_eye`],
      power: batting[`batting_ratings_${split}_power`],
      contact: batting[`batting_ratings_${split}_contact`],
      gap: batting[`batting_ratings_${split}_gap`],
      strikeouts: batting[`batting_ratings_${split}_strikeouts`],
    },
  }).from(players).where(
    and(
      eq(players.team_id, team_id),
      gte(players.position, 2),
      lte(players.position, 8),
    ),
  )
    .leftJoin(batting, eq(players.player_id, batting.player_id))
    .rightJoin(
      playerRoster,
      and(eq(players.player_id, playerRoster.player_id)),
    );
});
