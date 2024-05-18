<script lang="ts" setup>
const props = withDefaults(defineProps<{ label?: string }>(), { label: 'select' })
const model = defineModel<boolean>({ default: false })
</script>

<template>
  <CheckboxRoot v-model:checked="model" :aria-label="label">
    <div v-if="model" class="i-lucide-square-check-big color-primary-500" />
    <div v-else class="i-lucide-square" />
    <!-- <CheckboxIndicator>
    </CheckboxIndicator> -->
  </CheckboxRoot>
</template>

<style>

</style>
