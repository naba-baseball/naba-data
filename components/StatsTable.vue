<script lang="ts" setup generic="TData, TValue">
import type { ColumnDef } from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
} from '@tanstack/vue-table'

const props = defineProps<{
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
}>()

const table = useVueTable({
  data: props.data,
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
})
</script>

<template>
  <table class="base-table">
    <thead>
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <template v-for="header in headerGroup.headers" :key="header.id">
          <slot name="start-headers" :header="header" />
          <slot name="header" :header="header">
            <th>
              <FlexRender
                v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </th>
          </slot>
          <slot name="end-headers" :header="header" />
        </template>
      </tr>
    </thead>
    <tbody class="[&>tr:nth-child(even)]:bg-surface/70 [&_td]:p-2">
      <template v-if="table.getRowModel().rows?.length">
        <tr
          v-for="row in table.getRowModel().rows" :key="row.id"
          :data-state="row.getIsSelected() ? 'selected' : undefined"
        >
          <template v-for="cell in row.getVisibleCells()" :key="cell.id">
            <slot name="start-row" :cell="cell" />
            <slot name="row" :cell="cell">
              <td>
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </td>
            </slot>
            <slot name="end-row" :cell="cell" />
          </template>
        </tr>
      </template>
      <template v-else>
        <tr>
          <td :col-span="columns.length" class="h-24 text-center">
            No results.
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style>
.base-table {
  & tr th {
    min-width: 10ch;
    color: theme('colors.text-contrast');
  }
}
</style>
