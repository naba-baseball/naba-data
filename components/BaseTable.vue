<script
  lang="ts"
  setup
  generic="
    V extends string,
    T extends string,
    ITEM_TEXT extends string,
    ITEM_VALUE extends string
  "
>
type Item = { [key in ITEM_VALUE]: V } & { [key in ITEM_TEXT]: T }
const props = withDefaults(
  defineProps<{
    columns: []
    items: Item[]
    itemId?: keyof T
    columnText?: ITEM_TEXT
    columnValue?: ITEM_VALUE
  }>(),
  { itemId: 'id', columnText: 'text', columnValue: 'value', columns: () => [] },
)
const sortColumn = defineModel('sort')
const sortDir = ref<'asc' | 'desc'>('asc')
const sorted = useSorted(
  () => props.items,
  (a, b) => {
    if (sortColumn.value) {
      if (sortDir.value === 'asc')
        return a[sortColumn.value] > b[sortColumn.value] ? 1 : -1
      return a[sortColumn.value] > b[sortColumn.value] ? -1 : 1
    }
    return 0
  },
)
function handleSort(val) {
  if (sortColumn.value === val) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  }
  else {
    sortColumn.value = val
    sortDir.value = 'asc'
  }
}
</script>

<template>
  <table class="base-table gap-x-1 bg-surface-0 border rounded" :data-direction="sortDir">
    <thead class="grid grid-cols-subgrid col-span-full">
      <tr
        class="grid grid-cols-subgrid col-span-full place-content-start [&>*]:h-$table-header-height border-b"
      >
        <th class="sticky left-0 z-1 bg-surface-100 grid items-center px-3xs">
          {{ columns[0][columnText] }}
        </th>
        <th
          v-for="column of columns.slice(1, columns.length)"
          :key="`column-${column[columnValue]}`"
          class="capitalize flex items-center gap-xs cursor-pointer"
          @click="handleSort(column[columnValue])"
        >
          {{ column[columnText] }}
          <SortArrow
            class="sort-arrow"
            :class="
              column[columnValue] === sortColumn ? 'opacity-100' : 'opacity-0'
            "
          />
        </th>
      </tr>
    </thead>
    <tbody class="grid grid-cols-subgrid col-span-full">
      <tr
        v-for="item of sorted"
        :key="item[itemId]"
        class="grid grid-cols-subgrid col-span-full border-b h-$table-row-height"
      >
        <th class="sticky left-0 z-1 bg-surface-50 border-0 grid items-center px-3xs">
          <slot
            :name="columns[0][columnValue]"
            :item="item"
            :column="columns[0]"
          >
            {{ item[columns[0][columnValue]] }}
          </slot>
        </th>
        <td
          v-for="column of columns.slice(1, columns.length)" :key="`cell-${column[columnValue]}`"
          class="grid items-center"
        >
          <slot :name="column[columnValue]" :item :column>
            {{ item[column[columnValue]] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
.base-table {
  --table-column-count: v-bind("columns.length");
  display: grid;
  grid-template-columns: repeat(
    var(--table-column-count, 1),
    minmax(10ch, 1fr)
  );
  overflow-x: auto;
  &[data-direction="desc"] .sort-arrow {
    transform: rotate(-180deg);
  }
}
</style>
