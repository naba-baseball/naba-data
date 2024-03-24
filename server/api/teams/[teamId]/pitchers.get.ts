import { and, eq } from "drizzle-orm";
import { literal, object, optional, parse, union } from "valibot";
import {
  players,
  playersPitching,
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
  const db = useSQLite();
  const rosterVal = roster === "primary" ? 2 : 1;
  const pitching = db.select().from(playersPitching).where(
    eq(playersPitching.team_id, team_id),
  ).as("pitching");
  const playerRoster = db.select().from(teamRoster).where(
    and(eq(teamRoster.team_id, team_id), eq(teamRoster.list_id, rosterVal)),
  ).as("playerRoster");
  return await db.select({
    player_id: players.player_id,
    first_name: players.first_name,
    last_name: players.last_name,
    team_id: players.team_id,
    age: players.age,
    role: players.role,
    throws: players.throws,
    pitching: {
      stuff: pitching[`pitching_ratings_${split}_stuff`],
      control: pitching[`pitching_ratings_${split}_control`],
      movement: pitching[`pitching_ratings_${split}_movement`],
      balk: pitching[`pitching_ratings_${split}_balk`],
      hp: pitching[`pitching_ratings_${split}_hp`],
      wild_pitch: pitching[`pitching_ratings_${split}_wild_pitch`],
    },
  }).from(players).where(
    and(eq(players.team_id, team_id), eq(players.position, 1)),
  )
    .leftJoin(pitching, eq(players.player_id, pitching.player_id))
    .rightJoin(
      playerRoster,
      and(eq(players.player_id, playerRoster.player_id)),
    );
});
