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
  <table class="base-table bg-surface-0 border rounded">
    <thead class="grid grid-cols-subgrid col-span-full">
      <tr
        class="grid grid-cols-subgrid col-span-full place-content-start [&>*]:h-$table-header-height border-b"
      >
        <th v-if="props.selectable" data-header="select" />
        <th v-if="stickyColumn" class="sticky left-0 z-1 bg-surface-100 grid items-center px-3xs">
          {{ stickyColumn.columnDef.header }}
        </th>
        <th
          v-for="header of headers"
          :key="header.id"
          class="capitalize flex items-center gap-xs cursor-pointer"
        >
          {{ header.column.columnDef.header }}
          <SortArrow
            class="sort-arrow"
          />
        </th>
      </tr>
    </thead>
    <tbody class="grid grid-cols-subgrid col-span-full">
      <tr
        v-for="row of table.getRowModel().rows" :key="row.id"
        class="grid grid-cols-subgrid col-span-full border-b h-$table-row-height"
      >
        <td v-if="props.selectable" data-cell="select">
          <BaseCheckbox :model-value="row.getIsSelected()" @update:model-value="row.toggleSelected($event)" />
        </td>
        <th class="sticky left-0 z-1 bg-surface-50 border-0 grid items-center px-3xs">
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
          class="grid items-center"
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
  display: grid;
  grid-template-columns: repeat(
    var(--table-column-count, 1),
    minmax(max-content, 1fr)
  );
  overflow-x: auto;
  &[data-direction="desc"] .sort-arrow {
    transform: rotate(-180deg);
  }
  & [data-header="select"],[data-cell="select"] {
    place-self: center;
  }
  & th,td {
    padding-inline: theme('spacing.1');
  }
}
</style>
