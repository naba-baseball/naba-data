<script lang="ts" setup>
const model = defineModel<number>();
const { data: teams } = await useFetch("/api/teams");
</script>
s
<template>
  <v-select
    v-model="model"
    label="Team"
    :items="teams"
    item-value="team_id"
    item-title="name"
  />
</template>
