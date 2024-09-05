<script lang="ts" setup>
const options: { value: Split, label: string }[] = [
  { value: 'overall', label: 'Overall' },
  { value: 'vsl', label: 'vs. Left' },
  { value: 'vsr', label: 'vs. Right' },
  { value: 'talent', label: 'Potential' },
]
const model = defineModel<Split>({ default: 'overall' })
</script>

<template>
  <UFormGroup label="Split">
    <USelect v-model="model" name="split" :options />
  </UFormGroup>
</template>
