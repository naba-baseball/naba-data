<script lang="ts" setup generic="T">
const props = defineProps<{
  sortBy?: string
  items: T[]
  itemId: string
  headers: { label: string, value: string | ((item: T) => string) }[]
}>()
const emit = defineEmits<{ 'update:sortBy': [val: string] }>()
const sortBy = useVModel(props, 'sortBy', emit)
</script>

<template>
  <table>
    <thead>
      <tr class="[&>th]:(text-text-contrast min-w-[10ch])">
        <slot name="start-headers" />
        <slot name="headers" :sort-by="props.sortBy">
          <th v-for="header of props.headers" :key="header.value" :data-header="header.value">
            <button @click="sortBy = header.value">
              {{ header.label }}
            </button>
          </th>
        </slot>
        <slot name="end-headers" />
      </tr>
    </thead>
    <tbody class="[&>tr:nth-child(even)]:bg-surface/70 [&_td]:p-2">
      <tr v-for="(item, i) of props.items" :key="item[props.itemId]">
        <slot name="start-rows" />
        <slot name="rows" :item="item">
          <slot v-for="header of props.headers" :key="header.value">
            <td :data-cell="header.value">
              {{ item[header.value] }}
            </td>
          </slot>
        </slot>
        <slot name="end-rows" />
      </tr>
    </tbody>
  </table>
</template>

<style>

</style>
