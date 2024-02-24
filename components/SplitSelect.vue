<script lang="ts" setup>
const items: { value: Split; title: string }[] = [
  { value: "overall", title: "Overall" },
  { value: "vsl", title: "vs. Left" },
  { value: "vsr", title: "vs. Right" },
  { value: "talent", title: "Potential" },
];
const model = defineModel<Split>({ default: "overall" });
</script>

<template>
    <VSelect label="Split" :items="items" v-model="model" />
</template>

<style></style>
