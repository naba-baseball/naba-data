<script lang="ts" setup>
const model = defineModel<number>();
const { data: teams } = useNuxtData("teams");
if (!teams.value) {
  await useFetch("/api/teams", { key: "teams" });
}
</script>

<template>
  <UFormGroup label="Team">
    <USelect
      v-bind="$attrs"
      v-model="model"
      placeholder="select a team"
      :options="teams"
      option-attribute="name"
      value-attribute="team_id"
      :ui="{ variant: { outline: 'bg-primary-50 text-primary-900' } }"
    />
  </UFormGroup>
</template>

<style></style>
