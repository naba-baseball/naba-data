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
  { value: "control", title: "control" },
  { value: "movement", title: "movement" },
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
      } & {
        [key in PitchingRating]: number;
      } = {};
      tablePlayer.player_id = player.player_id;
      tablePlayer.age = player.age;
      tablePlayer.name = `${player.first_name} ${player.last_name}`;
      tablePlayer.throws = useHandAbbreviation(player).value;
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
    <BaseTable sort="role" :columns :items="filteredPlayers" columnText="title" columnValue="value" item-id="player_id">
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
