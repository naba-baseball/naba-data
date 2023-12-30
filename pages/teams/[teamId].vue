<script lang="ts" setup>
import { useRouteQuery } from "@vueuse/router";
import type { ColumnDef } from "@tanstack/vue-table";
const query = reactive({
  skip: useRouteQuery("skip", "0", { transform: Number }),
  limit: useRouteQuery("limit", "0", { transform: Number }),
  position: useRouteQuery("position", "all"),
  split: useRouteQuery("split", "batting_overall"),
});
const limit = computedEager(() => query.limit);
const skip = computedEager(() => query.skip);
const position = computedEager(() => query.position);

const [{ data: players }, { data: team }] = await Promise.all([
  useFetch(`/api/teams/${useRoute().params.teamId}/players`, {
    query: {
      skip,
      limit,
      position,
    },
    deep: false,
  }),
  useFetch(`/api/teams/${useRoute().params.teamId}`, { deep: false }),
]);

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
const splitOptions = [
  { value: "vsl", label: "vs. Left" },
  { value: "vsr", label: "vs. Right" },
  { value: "talent", label: "Potential" },
];
const rosterType = ref(2);
const sortBy = ref("position");
const filteredPlayers = computed(() => {
  const primaryRoster = team.value.data.roster
    .filter((entry) => entry.list_id === rosterType.value)
    .map((entry) => entry.player_id);
  return (
    players.value.data
      ?.filter((player) => primaryRoster.includes(player.player_id))
      .toSorted((a, b) => a[sortBy.value] - b[sortBy.value]) ?? []
  );
});

const battingLabels = [
  {
    key: "batting.batting_ratings_overall_babip",
    label: 'BABIP'
  },
  {
    key: "batting.batting_ratings_overall_contact",
    label: 'Contact'
  },
  {
    key: "batting.batting_ratings_overall_eye",
    label: 'Eye'
  },
  {
    key: "batting.batting_ratings_overall_gap",
    label: 'Gap'
  },
  {
    key: "batting.batting_ratings_overall_hp",
    label: 'HP'
  },
  {
    key: "batting.batting_ratings_overall_power",
    label: 'Power'
  },
  {
    key: "batting.batting_ratings_overall_strikeouts",
    label: 'Ks'
  },
];
const pitchingLabels = [
  { label: "balk", key: "balk" },
  { label: "control", key: "control" },
  { label: "hp", key: "hp" },
  { label: "movement", key: "movement" },
  { label: "stuff", key: "stuff" },
  { label: "wild_pitch", key: "wild_pitch" },
];
const pitchesLabels = [
  { label: "changeup", key: "changeup" },
  { label: "circlechange", key: "circlechange" },
  { label: "curveball", key: "curveball" },
  { label: "cutter", key: "cutter" },
  { label: "fastball", key: "fastball" },
  { label: "forkball", key: "forkball" },
  { label: "knuckleball", key: "knuckleball" },
  { label: "knucklecurve", key: "knucklecurve" },
  { label: "screwball", key: "screwball" },
  { label: "sinker", key: "sinker" },
  { label: "slider", key: "slider" },
  { label: "splitter", key: "splitter" },
];
const ratingsLabels = computed(() => {
  const [rating, split] = query.split.split("_");
  if (rating === "batting") return battingLabels;
  if (rating === "pitching") {
    if (split === "talent") return [...pitchesLabels, ...pitchingLabels];
    if (split === "pitches") return pitchesLabels;
    return pitchingLabels;
  }
  return [];
});

const headers = computed(() => [
  {key: 'name', label: 'Name'},
  {key: 'position', label: 'Position'},
  {key: 'age', label: 'Age'},
  ...ratingsLabels.value
])

const splits = computed(() => {
  return (
    filteredPlayers.value?.map((player) => {
      const [rating, split] = query.split.split("_");
      return ratingsKeys[rating][split].map((key) => player[rating][key]);
    }) ?? []
  );
});
</script>

<template>
  <article>
    <h1 v-if="team">
      {{ team.data?.name }}, {{ team.data?.nickname }}
    </h1>
    <u-tabs :items="[{label: 'Main'}, {label: 'Reserve'}]" />
    <fieldset>
      <legend>filters</legend>
      <label for="position">Position</label>
      <select id="position" v-model="query.position" name="position">
        <option value="all" selected>
          all
        </option>
        <option value="batters">
          Batters
        </option>
        <option value="pitchers">
          Pitchers
        </option>
      </select>
      <label name="split" for="split">Split</label>
      <select id="split" v-model="query.split">
        <optgroup label="Batting">
          <option value="batting_overall" selected>
            overall
          </option>
          <option
            v-for="option of splitOptions"
            :key="`batting_${option.value}`"
            :value="`batting_${option.value}`"
          >
            {{ option.label }}
          </option>
        </optgroup>
        <optgroup label="Pitching">
          <option value="pitching_overall" selected>
            overall
          </option>
          <option
            v-for="option of splitOptions"
            :key="`pitching_${option.value}`"
            :value="`pitching_${option.value}`"
          >
            {{ option.label }}
          </option>
        </optgroup>
      </select>
    </fieldset>
    <stats-table :columns="headers" :data="filteredPlayers" />
  </article>
</template>
