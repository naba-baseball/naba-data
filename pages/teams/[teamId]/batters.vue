<script setup>
import { useRouteQuery } from "@vueuse/router";
const { split, getSplit } = useBattingSplits();
const query = reactive({
  split: useRouteQuery("split", "batting_ratings_overall"),
  roster: useRouteQuery("roster", 2, { transform: Number }),
});
watchEffect(() => {
  split.value = query.split;
});
const positionOptions = [
  { value: "1", label: "Pitchers" },
  { value: "2", label: "Catchers" },
  { value: "3", label: "First Basemen" },
  { value: "4", label: "Second Basemen" },
  { value: "5", label: "Third Basemen" },
  { value: "6", label: "Shortstops" },
  { value: "7", label: "Left Fielders" },
  { value: "8", label: "Center Fielders" },
  { value: "9", label: "Right Fielders" },
];

const columns = [
  { value: "player_id", label: "ID" },
  { value: "name", label: "Name" },
  { value: "bats", label: "Bats" },
  { value: "age", label: "Age" },
  { value: "position", label: "Position" },
  { value: "contact", label: "Contact" },
  { value: "eye", label: "Eye" },
  { value: "gap", label: "Gap" },
  { value: "power", label: "Power" },
  { value: "strikeouts", label: "Ks" },
];
const { data: team } = useNuxtData("team");

const { data: players } = await useFetch(
  `/api/teams/${useRoute().params.teamId}/batters`,
  {
    deep: false,
    key: "batters",
  },
);
const primaryRoster = computed(() => {
  return team.value.roster
    .filter((entry) => entry.list_id === 2)
    .map((entry) => entry.player_id);
});
const reserveRoster = computed(() => {
  return team.value.roster
    .filter(
      (entry) =>
        entry.list_id === 1 && !primaryRoster.value.includes(entry.player_id),
    )
    .map((entry) => entry.player_id);
});
//primary players should never show on the reserve roster

const filteredPlayers = computed(() => {
  const activeRoster = query.roster === 2 ? primaryRoster : reserveRoster;
  return players.value
    .filter((player) => activeRoster.value.includes(player.player_id))
    .map((player) => {
      const tablePlayer = {};
      tablePlayer.player_id = player.player_id;
      tablePlayer.age = player.age;
      tablePlayer.name = `${player.first_name} ${player.last_name}`;
      tablePlayer.bats = useBatsAbbreviation(player).value;
      tablePlayer.position = getAbbreviatedPosition(player.position);
      tablePlayer.contact = getSplit(player, "contact");
      tablePlayer.eye = getSplit(player, "eye");
      tablePlayer.gap = getSplit(player, "gap");
      tablePlayer.power = getSplit(player, "power");
      tablePlayer.strikeouts = getSplit(player, "strikeouts");
      return tablePlayer;
    });
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex gap-3">
      <BattingSplitSelect v-model="query.split" />
      <VSelect
        label="Roster"
        id="roster"
        v-model="query.roster"
        name="roster"
        :items="[
          { title: 'Primary', value: 2 },
          { title: 'Reserve', value: 1 },
        ]"
      />
    </div>
    <VDataTable
      v-if="players"
      class="w-[120ch]"
      :columns="columns"
      :items="filteredPlayers"
    >
      <template
        v-for="rating of ['contact', 'eye', 'gap', 'power', 'strikeouts']"
        :key="rating"
        #[`item.${rating}`]="{ item }"
      >
        <div :data-rating="item[rating]">
          {{ item[rating] }}
        </div>
      </template>
    </VDataTable>
  </div>
</template>
