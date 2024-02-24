import papa from "papaparse";

export default eventHandler(async (event) => {
  await useDB().db("ratings").dropDatabase();
  const db = useDB().db("ratings");
  const [teams, roster, players, batting, pitching, fielding, contract] =
    await Promise.all([
      setupDB("teams.csv"),
      setupDB("team_roster.csv"),
      setupDB("players.csv"),
      setupDB("players_batting.csv"),
      setupDB("players_pitching.csv"),
      setupDB("players_fielding.csv"),
      setupDB("players_contract.csv"),
    ]);
  const finishedPlayers = players.map((player) => {
    player.pitching = scaleObject(
      pitching.find((p) => p.player_id === player.player_id),
    );

    player.batting = scaleObject(
      batting.find((p) => p.player_id === player.player_id),
    );
    const splits: Split[] = ["overall", "vsl", "vsr", "talent"] as const;
    splits.forEach((split) => {
      player.batting[split] = {};
    });
    Object.keys(player.batting).forEach((key) => {
      splits.forEach((split) => {
        if (key.includes(`${split}_`)) {
          player.batting[split][key.replace(`${split}_`, "")] =
            player.batting[key];
          delete player.batting[key];
        }
      });
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
  await db.collection("teams").insertMany(
    teams,
    // teams.map((team) => {
    //   team.roster = { primary: [], reserve: [] };
    //   team.roster.primary = roster
    //     .filter((r) => r.team_id === team.team_id && r.list_id === 2)
    //     .map((r) => finishedPlayers.find((p) => p.player_id === r.player_id));
    //   team.roster.reserve = roster
    //     .filter((r) => r.team_id === team.team_id && r.list_id === 1)
    //     .map((r) => finishedPlayers.find((p) => p.player_id === r.player_id));
    //   return team;
    // }),
  );
  return "ok";
});

async function setupDB(fileName: string) {
  const file = (await useStorage("files").getItem(fileName)) as string;
  const { data: docs } = await papa.parse(file, {
    dynamicTyping: true,
    header: true,
  });
  return docs;
}
