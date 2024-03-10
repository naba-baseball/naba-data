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
type Item = { [key in ITEM_VALUE]: V } & { [key in ITEM_TEXT]: T };
const props = withDefaults(
  defineProps<{
    columns: [];
    items: Item[];
    itemId?: keyof T;
    columnText?: ITEM_TEXT;
    columnValue?: ITEM_VALUE;
  }>(),
  { itemId: "id", columnText: "text", columnValue: "value", columns: () => [] },
);
const sortColumn = defineModel("sort");
const sortDir = ref<"asc" | "desc">("asc");
const sorted = useSorted(
  () => props.items,
  (a, b) => {
    if (sortColumn.value) {
      if (sortDir.value === "asc")
        return a[sortColumn.value] > b[sortColumn.value] ? 1 : -1;
      return a[sortColumn.value] > b[sortColumn.value] ? -1 : 1;
    }
    return 0;
  },
);
function handleSort(val) {
  if (sortColumn.value === val) {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = val;
    sortDir.value = "asc";
  }
}
</script>

<template>
  <table class="base-table gap-x-1" :data-direction="sortDir">
    <thead class="grid grid-cols-subgrid col-span-full">
      <tr
        class="grid grid-cols-subgrid col-span-full place-content-start h-$table-header-height border-b"
      >
        <th
          v-for="column of columns"
          :key="`column-${column[columnValue]}`"
          class="capitalize grid grid-flow-col items-center"
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
        class="grid grid-cols-subgrid col-span-full border-b h-$table-row-height"
        v-for="item of sorted"
        :key="item[itemId]"
      >
        <td v-for="column of columns" class="grid items-center">
          <slot :name="column.value" :item :column>
            {{ item[column.value] }}
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
  grid-template-columns: repeat(var(--table-column-count, 1), minmax(0, 1fr));
  &[data-direction="desc"] .sort-arrow {
    transform: rotate(-180deg);
  }
}
</style>
