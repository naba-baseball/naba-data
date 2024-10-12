import * as v from 'valibot'

export const paginationSchema = {
  limit: v.optional(v.pipe(v.union([v.number(), v.string()]), v.transform(i => Number(i))), 10),
  offset: v.optional(v.pipe(v.union([v.number(), v.string()]), v.transform(i => Number(i))), 0),
  orderBy: v.optional(v.tuple([v.string(), v.union([v.literal('asc'), v.literal('desc')])]), ['', 'asc']),
}
