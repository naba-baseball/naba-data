import { Readable } from "node:stream";
import { finished } from "node:stream/promises";
import papa from "papaparse";
import {
  players,
  playersBatting,
  playersFielding,
  playersPitching,
  teamRoster,
  teams,
} from "~/server/drizzle/schema.js";
export default defineTask({
  meta: {
    name: "db:import",
    description: "import csv files into sqlite",
  },
  async run() {
    console.log("importing files");
    const db = useSQLite();
    await parse("teams.csv", db, teams);
    await parse("team_roster.csv", db, teamRoster);
    await parse("players.csv", db, players);
    await parse("players_batting.csv", db, playersBatting);
    await parse("players_pitching.csv", db, playersPitching);
    await parse("players_fielding.csv", db, playersFielding);

    // await db.insert(teams).values(await parse("teams.csv"));
    // await db.insert(teamRoster).values(await parse("team_roster.csv"));
    // await processLargeArray(playersData, db, players);
    // const battingData = await parse("players_batting.csv");
    // await processLargeArray(battingData, db, playersBatting);
    // const pitchingData = await parse("players_pitching.csv");
    // await processLargeArray(pitchingData, db, playersPitching);
    // const fieldingData = await parse("players_fielding.csv");
    // await processLargeArray(fieldingData, db, playersFielding);
    return {
      result: "imported files",
    };
  },
});

async function processLargeArray(
  arr: any[],
  db: ReturnType<typeof useSQLite>,
  table: any,
) {
  const chunks = arr.length % 100;
  for (let i = 0; i < chunks; i++) {
    await db.insert(table).values(arr.slice(i * 100, (i + 1) * 100));
  }
}

async function parse(
  item: string,
  db: ReturnType<typeof useSQLite>,
  table: any,
) {
  const buffer = (await useStorage("files").getItemRaw(item)) as Buffer;
  const parseStream = papa.parse(papa.NODE_STREAM_INPUT, {
    header: true,
    dynamicTyping: true,
  });

  const stream = Readable.from(buffer).pipe(parseStream);
  let buf = []
  stream.on("data", async (res) => {
    // console.log("RES", res);
    buf.push(res)
    if(buf.length > 100){
      stream.pause()
      await db.insert(table).values(buf);
      buf = []
      stream.resume()
    }
  });
  stream.on('end', async () =>{
    if(buf.length > 0){
      await db.insert(table).values(buf)
    }
  })
  return await finished(stream);
}
