<script lang="ts" setup>
const lineupsStore = useLineupsStore();
const { split, roster, team } = toRefs(lineupsStore);
const items: { value: typeof roster.value; text: string }[] = [
  { value: 1, text: "Reserve" },
  { value: 2, text: "Primary" },
];
</script>

<template>
  <fieldset class="flex gap-sm">
    <TeamSelect color="primary" v-model="team" />
    <SplitSelect v-model="split" />
    <FieldSelect label="Roster" v-model="roster" :items />
  </fieldset>
</template>

<style></style>
