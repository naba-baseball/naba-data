<script lang="ts" setup>
import { useRouteQuery } from "@vueuse/router";
const split = useRouteQuery<Split>("split", "overall");
const roster = useRouteQuery<"primary" | "reserve">("roster", "primary");
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
  { value: "name", title: "Name" },
  { value: "bats", title: "Bats" },
  { value: "age", title: "Age" },
  { value: "position", title: "Position" },
  { value: "contact", title: "Contact" },
  { value: "eye", title: "Eye" },
  { value: "gap", title: "Gap" },
  { value: "power", title: "Power" },
  { value: "strikeouts", title: "Ks" },
];

const { data: players } = await useFetch(
  computed(
    () =>
      `/api/teams/${useRoute().params.teamId}/batters?${new URLSearchParams({
        split: split.value,
        roster: roster.value,
      }).toString()}`,
  ),
  {
    deep: false,
    key: "batters",
  },
);
//primary players should never show on the reserve roster
const filteredPlayers = shallowRef([]);
watch(
  players,
  (players) => {
    filteredPlayers.value = players.map((player) => {
      const tablePlayer: Player & {
        name: string;
        bats: string;
        position: string;
      } & {
        [key in BattingRating]: number;
      } = {};
      tablePlayer.player_id = player.player_id;
      tablePlayer.age = player.age;
      tablePlayer.name = `${player.first_name} ${player.last_name}`;
      tablePlayer.bats = useBatsAbbreviation(player).value;
      tablePlayer.position = getAbbreviatedPosition(player.position);
      tablePlayer.contact = player.batting[split.value].contact;
      tablePlayer.eye = player.batting[split.value].eye;
      tablePlayer.gap = player.batting[split.value].gap;
      tablePlayer.power = player.batting[split.value].power;
      tablePlayer.strikeouts = player.batting[split.value].strikeouts;
      return tablePlayer;
    });
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex gap-3">
      <SplitSelect v-model="split" />
      <VSelect
        label="Roster"
        id="roster"
        v-model="roster"
        name="roster"
        :items="[
          { title: 'Primary', value: 'primary' },
          { title: 'Reserve', value: 'reserve' },
        ]"
      />
    </div>
    <VDataTable
      v-if="players"
      class="w-[120ch]"
      :headers="columns"
      :items="filteredPlayers"
      density="compact"
    >
      <template
        v-for="rating of ['contact', 'eye', 'gap', 'power', 'strikeouts']"
        #[`item.${rating}`]="{ item }"
      >
        <div :data-rating="item[rating]">
          {{ item[rating] }}
        </div>
      </template>
    </VDataTable>
  </div>
</template>
