import {
  coerce,
  object,
  optional,
  parse,
  string,
  union,
  unknown,
} from "valibot";
import { findByTeam } from "@/server/services/players.service.js";

const Schema = object({
  ...paginationSchema,
  position: optional(union([coerce(string(), Number), unknown()])),
});

export default defineEventHandler(
  async (event) => {
    const teamId = await getValidatedRouterParams(
      event,
      parseNumeric("teamId"),
    );
    const params = await getValidatedQuery(event, (data) =>
      parse(Schema, data),
    );
    const { position, limit, skip } = params;
    const data = await findByTeam(teamId, { position, limit, skip });
    return data;
  },
);
