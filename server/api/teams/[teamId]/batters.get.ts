import {
  literal,
  number,
  object,
  optional,
  parse,
  string,
  transform,
  union,
} from "valibot";
import { parseNumeric } from "~/server/utils/parsers.js";
export default defineEventHandler(async (event) => {
  const { teamId: team_id } = await getValidatedRouterParams(
    event,
    parseNumeric("teamId"),
  );

  const { split, roster } = await getValidatedQuery(event, (data) =>
    parse(
      object({
        roster: optional(
          union([literal("primary"), literal("reserve")]),
          "primary",
        ),
        split: optional(
          union([
            literal("overall"),
            literal("talent"),
            literal("vsl"),
            literal("vsr"),
          ]),
          "overall",
        ),
      }),
      data,
    ),
  );
  const db = useDB().db("ratings");
  return db
    .collection("players")
    .find({
      team_id,
      position: { $gte: 2, $lte: 8 },
      roster
    })
    .sort({ position: 1 })
    .project<Player & { bats: number; batting: BattingRatingSplits }>({
      _id: 1,
      player_id: 1,
      first_name: 1,
      last_name: 1,
      position: 1,
      team_id: 1,
      age: 1,
      role: 1,
      bats: 1,
      batting: {
        [split]: 1,
      },
      roster: {
        [roster]: 1,
      },
    })
    .toArray();
});
