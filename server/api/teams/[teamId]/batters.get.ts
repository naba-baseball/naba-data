import { findByTeam } from "@/server/services/players.service.js";
import type { BattingRating, BattingSplit } from "~/composables/BattingSplits.js";

export default defineEventHandler(async (event) => {
  const team_id = Number(getRouterParam(event, "teamId"));
  // const data = await findByTeam(teamId, { position: 'batters' });
  const db = useDB().db("ratings");
  return (await db
    .collection("players")
    .find({ team_id, position: { $gte: 2, $lte: 8 } })
    .sort({ position: 1 })
    .project({
      _id: 1,
      player_id: 1,
      first_name: 1,
      last_name: 1,
      position: 1,
      age: 1,
      bats: 1,
      batting: 1,
      role: 1,
    })
    .toArray()) as {
    _id: number;
    player_id: number;
    first_name: string;
    last_name: string;
    position: number;
    age: number;
    bats: number;
    batting: Record<`${BattingSplit}_${BattingRating}`, number>;
    role: number;
  }[];
});
