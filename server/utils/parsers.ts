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

export const parseNumeric = (key: string) => (data: unknown) =>
  parse(
    object({
      [key]: transform(string(), Number, number()),
    }),
    data,
  );

export const parseSplit  = () => optional(
  union([
    literal("overall"),
    literal("talent"),
    literal("vsl"),
    literal("vsr"),
  ]),
  "overall",
);

export const parseRoster =  () => optional(
  union([literal("primary"), literal("reserve")]),
  "primary",
)