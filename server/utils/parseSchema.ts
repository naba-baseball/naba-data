import { parse } from 'valibot'
import type { BaseSchema } from 'valibot'

export function parseSchema<T extends BaseSchema>(schema: T, event: H3Event) {
  let params
  try {
    params = parse(schema, getQuery(event))
  }
  catch (err) {
    throw createError({ statusCode: 400, statusMessage: 'Bad Request', data: err })
  }
  return params
}
