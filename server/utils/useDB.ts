import { MongoClient } from "mongodb";

const mongo = new MongoClient(useRuntimeConfig().databaseURL, {
  ignoreUndefined: true,
});
export function useDB() {
  return mongo;
}
