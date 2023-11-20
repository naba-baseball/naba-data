import process from 'node:process'
import type { Config } from 'drizzle-kit'

export default {
  schema: './server/utils/schema.ts',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
} satisfies Config
