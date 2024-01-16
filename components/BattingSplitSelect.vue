<script lang="ts" setup>
const items: { value: BattingSplit; title: string }[] = [
  { value: "batting_ratings_overall", title: "Overall" },
  { value: "batting_ratings_vsl", title: "vs. Left" },
  { value: "batting_ratings_vsr", title: "vs. Right" },
  { value: "batting_ratings_talent", title: "Potential" },
];
const model = defineModel<BattingSplit>({ default: "batting_ratings_overall" });
</script>

<template>
    <VSelect label="Split" :items v-model="model" />
</template>

<style></style>
