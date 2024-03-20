export default defineTask({
  meta: {
    name: "db:delete",
    description: "delete sqlite files",
  },
  async run() {
    console.log("deleting sqlite files");
    const fs = useStorage("sqliteDB");
    await fs.removeItem("sqlite.db");
    await fs.setItem("sqlite.db", "");
    return { result: "deleted sqlite files" };
  },
});
