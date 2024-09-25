import * as v from 'valibot'

export function parseNumeric(key: string) {
  return (data: unknown) =>
    v.parse(
      v.object({
        [key]: v.pipe(v.string(), v.transform(Number)),
      }),
      data,
    )
}

export function parseTeamId() {
  return (data: unknown) =>
    v.parse(
      v.object({
        teamId: v.pipe(v.union([v.string(), v.number()]), v.transform(Number), v.minValue(0)),
      }),
      data,
    )
}

export function parseSplit() {
  return v.optional(
    v.union([
      v.literal('overall'),
      v.literal('talent'),
      v.literal('vsl'),
      v.literal('vsr'),
    ]),
    'overall',
  )
}

export function parseRoster() {
  return v.optional(
    v.union([v.literal('primary'), v.literal('reserve')]),
    'primary',
  )
}
