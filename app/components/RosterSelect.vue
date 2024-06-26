<script lang="ts" setup>
const options = [
  { value: 'primary', label: 'Primary' },
  { value: 'reserve', label: 'Reserve' },
]
const model = defineModel<(typeof options)[number]['value']>()
</script>

<template>
  <UFormGroup label="Roster">
    <USelect v-model="model" name="roster" :options />
  </UFormGroup>
</template>
