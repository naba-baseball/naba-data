<script lang="ts" setup>
const model = defineModel<number>();
const { data: teams } = await useFetch("/api/teams", {
  transform: (data) =>
    data.map((team) => ({ text: team.name, value: team.team_id })),
  default: () => []
});
</script>
<template>
  <FieldSelect v-model="model" :items="teams" />
</template>
