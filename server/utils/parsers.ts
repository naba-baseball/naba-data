import {
  literal,
  minValue,
  number,
  object,
  optional,
  parse,
  string,
  toMinValue,
  transform,
  union,
} from 'valibot'

export function parseNumeric(key: string) {
  return (data: unknown) =>
    parse(
      object({
        [key]: transform(string(), Number, number()),
      }),
      data,
    )
}

export function parseTeamId() {
  return (data: unknown) =>
    parse(
      object({
        teamId: transform(string(), Number, number([minValue(1)])),
      }),
      data,
    )
}

export function parseSplit() {
  return optional(
    union([
      literal('overall'),
      literal('talent'),
      literal('vsl'),
      literal('vsr'),
    ]),
    'overall',
  )
}

export function parseRoster() {
  return optional(
    union([literal('primary'), literal('reserve')]),
    'primary',
  )
}
