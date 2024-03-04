<script lang="ts" setup>
const items = [
  { value: "primary", text: "Primary" },
  { value: "reserve", text: "Reserve" },
] as const
const model = defineModel<(typeof items)[number]['value']>("primary");
</script>

<template>
  <FieldSelect v-model="model" label="Roster" :items />
</template>

<style></style>
