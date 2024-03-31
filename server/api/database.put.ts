import papa from "papaparse";

export default authenticatedEventHandler(async (event) => {
  const db = useDB().db("ratings");
  await db.dropCollection("players");
  await db.dropCollection("teams");

  const [teams, roster, players, batting, pitching, fielding, contract] =
    await Promise.all([
      setupDB<any>("teams.csv"),
      setupDB<any>("team_roster.csv"),
      setupDB<any>("players.csv"),
      setupDB<any>("players_batting.csv"),
      setupDB<any>("players_pitching.csv"),
      setupDB<any>("players_fielding.csv"),
      setupDB<any>("players_contract.csv"),
    ]);
  const finishedPlayers = players.map((_p) => {
    const player = { ..._p };
    player.pitching = scaleObject(
      pitching.find((p) => p.player_id === player.player_id),
    );

    player.batting = scaleObject(
      batting.find((p) => p.player_id === player.player_id),
    );
    const unflattenRatings = (
      group: "batting" | "pitching" | "fielding" | string,
      splits: string[],
    ) => {
      splits.forEach((split) => {
        player[group] ??= {};
        player[group][split] ??= {};
      });
      Object.keys(player[group]).forEach((key) => {
        splits.forEach((split) => {
          if (key.includes(`${split}_`)) {
            player[group][split][key.replace(`${split}_`, "")] =
              player[group][key];
            delete player[group][key];
          }
        });
      });
    };
    const splits: (Split | "misc")[] = [
      "overall",
      "vsl",
      "vsr",
      "talent",
      "misc",
    ] as const;

    unflattenRatings("batting", splits);
    unflattenRatings("pitching", splits);

    //one off for pitches
    player.pitches ??= { overall: {}, talent: {} };
    Object.keys(player.pitching).forEach((key) => {
      if (key.includes("pitches_")) {
        player.pitches.overall[key.replace("pitches_", "")] =
          player.pitching[key];
        delete player.pitching[key];
      }
    });
    //one off for pitches talent
    Object.keys(player.pitching.talent).forEach((key) => {
      if (key.includes("pitches_")) {
        player.pitches.talent[key.replace("pitches_", "")] =
          player.pitching.talent[key];
        delete player.pitching.talent[key];
      }
    });

    player.fielding = scaleObject(
      fielding.find((p) => p.player_id === player.player_id),
    );

    player.contract = contract.find((c) => c.player_id === player.player_id);
    player.roster = "reserve";
    if (
      roster.find((r) => r.player_id === player.player_id && r.list_id === 2)
    ) {
      player.roster = "primary";
    }

    return player;
  });
  await db.collection("players").insertMany(finishedPlayers);
  await db.collection("teams").insertMany(teams);
  return "ok";
}, 'admin');

async function setupDB<T>(fileName: string) {
  const file = (await useStorage("files").getItem(fileName)) as string;
  const { data: docs } = await papa.parse(file, {
    dynamicTyping: true,
    header: true,
  });
  return docs as T[];
}
