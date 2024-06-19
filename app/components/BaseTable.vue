<script lang="ts" setup generic="T extends Record<string, unknown>">
import { type ColumnDef, getCoreRowModel, useVueTable } from '@tanstack/vue-table'

type Item = T & { id?: string }
const props = withDefaults(
  defineProps<{
    selectable?: boolean
    columns: ColumnDef<Item>[]
    items: Item[]
    itemId?: keyof Item | string
  }>(),
  { columns: () => [], items: () => [], itemId: 'id' },
)
const model = defineModel<Record<string, T>>({ default: () => ({}) })
const allColumns = computed(() => {
  if (props.selectable)
    return [{ id: 'select', header: '' }, ...props.columns]
  return props.columns
})
const selected = computed<Record<string, boolean>>(() => {
  const newMap: Record<string, boolean> = {}
  for (const key of Object.keys(model.value))
    newMap[key] = true
  return newMap
})

const table = useVueTable({
  get columns() {
    return allColumns.value
  },
  get data() { return props.items },
  getCoreRowModel: getCoreRowModel(),
  getRowId: row => `${row[props.itemId]}`,
  get enableMultiRowSelection() {
    return props.selectable
  },
  state: {
    get rowSelection() {
      return selected.value
    },
  },
  onRowSelectionChange(updater) {
    if (updater instanceof Function) {
      const result = updater(selected.value)
      model.value = Object.keys(result)
        .filter(key => result[key])
        .reduce(
          (acc, key) => {
            acc[key] = props.items.find(item => `${item[props.itemId]}` === key) as T
            return acc
          },
          {} as Record<string, T>,
        )
    }
  },
})

const firstColumnIndex = () => props.selectable ? 1 : 0
const stickyColumn = computed(() => table.getAllColumns()[firstColumnIndex()])
const headers = computed(() => table.getFlatHeaders().slice(firstColumnIndex() + 1))
</script>

<template>
  <table class="base-table">
    <thead >
      <tr>
        <th v-if="props.selectable" data-header="select" />
        <th v-if="stickyColumn">
          {{ stickyColumn.columnDef.header }}
        </th>
        <th
          v-for="header of headers"
          :key="header.id"
        >
          {{ header.column.columnDef.header }}
          <SortArrow
            class="sort-arrow"
          />
        </th>
      </tr>
    </thead>
    <tbody >
      <tr
        v-for="row of table.getRowModel().rows" :key="row.id"
      >
        <td v-if="props.selectable" data-cell="select">
          <BaseCheckbox :model-value="row.getIsSelected()" @update:model-value="row.toggleSelected($event)" />
        </td>
        <th>
          <slot
            :name="stickyColumn.id"
            :row="row"
            :column="stickyColumn"
          >
            {{ row.renderValue(stickyColumn.id) }}
          </slot>
        </th>
        <td
          v-for="cell of row.getAllCells().slice(firstColumnIndex() + 1)" :key="cell.id"
        >
          <slot :name="cell.column.id" :row="cell.row" :column="cell.column">
            {{ cell.renderValue() }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
.base-table {
  --table-column-count: v-bind("allColumns.length");
}
</style>
