import { coerce, number, object, optional } from 'valibot'

export function createPaginationSchema() {
  return {
    skip: optional(coerce(number(), Number), 0),
    limit: optional(coerce(number(), Number), 10),
  }
}
