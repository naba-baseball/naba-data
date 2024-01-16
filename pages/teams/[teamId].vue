<script lang="ts" setup>
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
const route = useRoute()
const {data: team} = await useFetch(`/api/teams/${route.params.teamId}`, { deep: false, key: 'team' })
</script>

<template>
  <article data-team class="p-md">
    <div class=" max-w-md relative">
      <div class="flex shadow-lg shadow-gray-100 dark:shadow-gray-800 p-md justify-between rounded-lg bg-[--team-bg] gap-md">
        <h1 class="text-2xl font-bold uppercase tracking-wider text-[--team-text]">
          {{ team.name }}, {{ team.nickname }}
        </h1>
        <img class="block absolute w-[12ch]  -right-[15%] bottom-[15%] rounded border-4 border-[--team-jersey-visor] bg-white" :src="`https://nabaleague.com/images/team_logos/${team.logo_file_name}`">
      </div>
    </div>
    <div>
      <nuxt-link class="text-xl" :to="`/teams/${team.team_id}/batters`">
        Batters
      </nuxt-link>
    </div>
    <div>
      <NuxtPage />
    </div>
  </article>
</template>
<style scoped>
[data-team] {
  --team-bg: color-mix(in srgb, v-bind('team.background_color_id'), #fff 60%);
  --team-text: color-mix(in srgb, v-bind('team.text_color_id'), v-bind('team.background_color_id'), #000 5%);
  --team-jersey-away: v-bind('team.jersey_away_color_id');
  --team-jersey-main: v-bind('team.jersey_main_color_id');
  --team-jersey-secondary: v-bind('team.jersey_secondary_color_id');
  --team-jersey-stripes: v-bind('team.jersey_pin_stripes_color_id');
  --team-jersey-ballcap: v-bind('team.ballcaps_main_color_id');
  --team-jersey-visor: v-bind('team.ballcaps_visor_color_id');
}
</style>