import { migrate } from "drizzle-orm/libsql/migrator";
import { resolve } from "node:path";
export default defineTask({
  meta: {
    name: "db:migrate",
    description: "run migrations",
  },
  async run() {
    console.log("running migration");
    const db = useSQLite();
    // const migrationsFolder = import.meta.dev ? "drizzle" : "../../../../drizzle";
    console.log("WHERE AM I", resolve("server/drizzle"));
    await migrate(db, { migrationsFolder: "server/drizzle" });
    return { result: "migrations applied" };
  },
});
