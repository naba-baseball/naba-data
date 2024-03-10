<script lang="ts" setup>
const items = [
  { value: "primary", text: "Primary" },
  { value: "reserve", text: "Reserve" },
]
const model = defineModel<(typeof items)[number]["value"]>();
</script>

<template>
  <FieldSelect
    v-model="model"
    label="Roster"
    :items
  />
</template>

<style></style>
