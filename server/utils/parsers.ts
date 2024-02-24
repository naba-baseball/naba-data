import { number, object, parse, string, transform, variant } from "valibot";

export const parseNumeric = (key: string) => (data: unknown) =>
  parse(
    object({
      [key]: transform(string(), Number, number()),
    }),
    data,
  );
