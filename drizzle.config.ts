import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./server/drizzle/schema.ts",
  out: "./server/drizzle",
  driver: "turso",
  dbCredentials: {
    url: "libsql://curious-phoenix-twitch0125.turso.io",
    authToken: process.env.NUXT_TURSO_AUTH_TOKEN,
  },
} satisfies Config;
