import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "../drizzle/schema.js";
let _db: LibSQLDatabase<typeof schema>;

export function useSQLite() {
  if (_db) return _db;
  const connection = createClient({
    url: useRuntimeConfig().databaseURL,
    authToken: useRuntimeConfig().tursoAuthToken,
  });

  _db = drizzle(connection, { schema });
  return _db;
}
