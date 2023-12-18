import { MongoClient } from "mongodb";

const mongo = new MongoClient(useRuntimeConfig().databaseURL, {
  ignoreUndefined: true,
});
await mongo.connect();
export function useDB() {
  return mongo;
}
