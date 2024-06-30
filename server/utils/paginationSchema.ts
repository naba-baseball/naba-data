import * as v from 'valibot'

// export const paginationSchema = {
//   skip: optional(coerce(number(), Number), 0),
//   limit: optional(coerce(number(), Number), 10),
// }

export const paginationSchema = {
  skip: v.optional(v.pipe(v.union([v.number(), v.string()]), v.transform(i => Number(i))), 0),
  limit: v.optional(v.pipe(v.union([v.number(), v.string()]), v.transform(i => Number(i))), 10),
}
