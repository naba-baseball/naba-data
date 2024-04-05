<script lang="ts" setup>
import { useRouteQuery } from "@vueuse/router";
const split = useRouteQuery<Split>("split", "overall");
const roster = useRouteQuery<"primary" | "reserve">("roster", "primary");
const columns = [
  { value: "name", title: "Name" },
  { value: "throws", title: "Throws" },
  { value: "age", title: "Age" },
  { value: "role", title: "Role" },
  { value: "stuff", title: "stuff" },
  { value: "movement", title: "movement" },
  { value: "control", title: "control" },
];

const { data: players } = await useFetch(
  `/api/teams/${useRoute().params.teamId}/pitchers`,
  {
    deep: false,
    query: {
      split,
      roster,
    },
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
        throws: string;
      } & {
        [key in PitchingRating]: number;
      } = {};
      tablePlayer.player_id = player.player_id;
      tablePlayer.age = player.age;
      tablePlayer.name = `${player.first_name} ${player.last_name}`;
      tablePlayer.throws = useHandAbbreviation(player.throws).value;
      tablePlayer.role = player.role;
      tablePlayer.stuff = player.pitching.stuff;
      tablePlayer.control = player.pitching.control;
      tablePlayer.movement = player.pitching.movement;
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
      <RosterSelect v-model="roster" />
    </div>
    <BaseTable
      sort="role"
      :columns
      :items="filteredPlayers"
      column-text="title"
      column-value="value"
      item-id="player_id"
    >
      <template #name="{ item, column }">
        <a class="underline underline-dashed underline-surface-300 underline-offset-[0.25rem]" :href="`https://nabaleague.com/players/player_${item.player_id}`">
          {{ item[column.value] }}
        </a>
      </template>
      <template
        v-for="rating of ['stuff', 'control', 'movement']"
        #[rating]="{ column, item }"
      >
        <div :data-rating="item[column.value]">
          {{ item[column.value] }}
        </div>
      </template>
      <template #role="{ item, column }">
        {{ getAbbreviatedRole(item[column.value]) }}
      </template>
    </BaseTable>
  </div>
</template>
