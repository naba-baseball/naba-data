<script lang="ts" setup>
const options: { value: BattingSplit; label: string }[] = [
  { value: "batting_ratings_overall", label: "Overall" },
  { value: "batting_ratings_vsl", label: "vs. Left" },
  { value: "batting_ratings_vsr", label: "vs. Right" },
  { value: "batting_ratings_talent", label: "Potential" },
];
const model = defineModel<BattingSplit>({ default: "batting_ratings_overall" });
</script>

<template>
  <UFormGroup label="Split">
    <USelect :options="options" v-model="model" />
  </UFormGroup>
</template>

<style></style>
