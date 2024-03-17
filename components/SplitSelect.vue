<script lang="ts" setup>
const items: { value: Split; text: string }[] = [
  { value: "overall", text: "Overall" },
  { value: "vsl", text: "vs. Left" },
  { value: "vsr", text: "vs. Right" },
  { value: "talent", text: "Potential" },
];
const model = defineModel<Split>({ default: "overall" });
</script>

<template>
  <FieldSelect v-model="model" name="split" label="Split" :items />
</template>
