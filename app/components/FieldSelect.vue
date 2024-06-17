<script lang="ts" setup generic="M extends string | number">
type Item = Record<string, M>
defineOptions({ inheritAttrs: false })
withDefaults(
  defineProps<{
    itemText?: keyof Item
    itemValue?: keyof Item
    items: Item[]
    label: string
  }>(),
  {
    items: () => [],
    label: '',
    itemText: 'text',
    itemValue: 'value',
  },
)
const model = defineModel<M>()
</script>

<template>
  <label class="field-container">
    <div class="text-label">{{ label }}</div>
    <select v-bind="$attrs" v-model="model" class="field-input">
      <option v-for="item of items" :key="item[itemValue]" :value="item[itemValue]">
        {{ item[itemText] }}
      </option>
    </select>
  </label>
</template>

<style>
.field-container {
  
}
</style>
