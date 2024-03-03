<script lang="ts" setup>
import { useRouteQuery } from "@vueuse/router";
const split = useRouteQuery<Split>("split", "overall");
const roster = useRouteQuery<"primary" | "reserve">("roster", "primary");
const pitchingRatings = ["stuff", "control", "movement"] as const;
const columns = [
  { value: "name", title: "Name" },
  { value: "throws", title: "Throws" },
  { value: "age", title: "Age" },
  { value: "role", title: "Role" },
  { value: "stuff", title: "stuff" },
  { value: "control", title: "control" },
  { value: "movement", title: "movement" }
];

const { data: players } = await useFetch(
  computed(
    () =>
      `/api/teams/${useRoute().params.teamId}/pitchers?${new URLSearchParams({
        split: split.value,
        roster: roster.value,
      }).toString()}`,
  ),
  {
    deep: false,
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
        position: string;
      } & {
        [key in PitchingRating]: number;
      } = {};
      tablePlayer.player_id = player.player_id;
      tablePlayer.age = player.age;
      tablePlayer.name = `${player.first_name} ${player.last_name}`;
      tablePlayer.throws = useHandAbbreviation(player).value;
      tablePlayer.role = getAbbreviatedRole(player.role);
      tablePlayer.stuff = player.pitching.stuff
      tablePlayer.control = player.pitching.control
      tablePlayer.movement = player.pitching.movement
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
        v-for="rating of pitchingRatings"
        #[`item.${rating}`]="{ item }"
      >
        <div :data-rating="item[rating]">
          {{ item[rating] }}
        </div>
      </template>
    </VDataTable>
  </div>
</template>
