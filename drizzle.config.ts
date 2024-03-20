import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();
console.log({
  url: process.env.NUXT_TURSO_URL,
  authToken: process.env.NUXT_TURSO_AUTH_TOKEN,
});
export default {
  schema: "./server/drizzle/schema.ts",
  out: "./server/drizzle",
  driver: "libsql",
  dbCredentials: {
    url: process.env.NUXT_TURSO_URL,
    // authToken: process.env.NUXT_TURSO_AUTH_TOKEN,
  },
} satisfies Config;
