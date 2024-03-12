import { migrate } from "drizzle-orm/libsql/migrator";

export default defineTask({
  meta: {
    name: "db:migrate",
    description: "run migrations",
  },
  run() {
    console.log("running migration");
    const db = useSQLite();
    migrate(db, { migrationsFolder: "./server/drizzle" });
    return { result: "success" };
  },
});
