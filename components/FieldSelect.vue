<script lang="ts" setup generic="M, T extends string, V extends string">
type TItem = { [key in T]: string } | { text?: string }
type VItem = { [key in V]: M } | { value?: M }

type Item = TItem & VItem
defineOptions({ inheritAttrs: false })
withDefaults(
  defineProps<{
    itemText?: T
    itemValue?: V
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
      <option
        v-for="item of items"
        :key="item[itemValue as V]"
        :value="item[itemValue as V]"
      >
        {{ item[itemText as T] }}
      </option>
    </select>
  </label>
</template>

<style></style>
