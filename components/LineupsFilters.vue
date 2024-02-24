<script lang="ts" setup>
const rosterOptions = [
  { value: 1, title: "Reserve" },
  { value: 2, title: "Primary" },
];
const lineupsStore = useLineupsStore();
const { split, roster, team } = toRefs(lineupsStore);
</script>

<template>
  <fieldset class="flex gap-sm">
    <TeamSelect color="primary" v-model="team" />
    <SplitSelect v-model="split" />
    <VSelect label="Roster" v-model="roster" :items="rosterOptions" />
  </fieldset>
</template>

<style></style>
