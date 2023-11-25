import { coerce, number, optional } from 'valibot'

export const paginationSchema = {
  skip: optional(coerce(number(), Number), 0),
  limit: optional(coerce(number(), Number), 10),
}
