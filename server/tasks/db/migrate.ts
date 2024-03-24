import { migrate } from "drizzle-orm/libsql/migrator";

export default defineTask({
  meta: {
    name: "db:migrate",
    description: "run migrations",
  },
  async run() {
    console.log("running migration");
    const db = useSQLite();

    await migrate(db, { migrationsFolder: "server/assets/drizzle" });
    return { result: "migrations applied" };
  },
});
