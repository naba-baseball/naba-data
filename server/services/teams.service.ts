import { useDB } from "#imports";

const db = useDB().db("ratings");
export async function findAll() {
  return await db
    .collection("teams")
    .find({ team_id: { $gt: 0 } })
    .toArray();
}
export async function findById(teamId: number) {
  return await db.collection("teams").findOne({ team_id: teamId });
}
