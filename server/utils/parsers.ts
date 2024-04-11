import {
  literal,
  number,
  object,
  optional,
  parse,
  string,
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
