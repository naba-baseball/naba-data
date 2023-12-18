import { defineEventHandler } from "h3";
import { fromPlayers } from "@/server/services/players.service.js";

export default defineEventHandler(async () => {
  const players = await fromPlayers()
    .find(
      {
        "batting.batting_ratings_overall_contact": { $gte: 30 },
      },
      {
        limit: 50,
        sort: {
          "batting.batting_ratings_overall_contact": 1,
        },
      },
    )
    .toArray();
  console.log(players);
  return players;
});
