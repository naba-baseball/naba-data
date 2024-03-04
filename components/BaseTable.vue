<script
  lang="ts"
  setup
  generic="K extends string, T extends { [key in K]: any } & { id?: string }"
>
const props = withDefaults(
  defineProps<{
    columns: { value: K; title: string }[];
    items: T[];
    itemId?: keyof T;
  }>(),
  { itemId: "id" },
);
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="column of columns" :key="column.value">
          {{ column.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item of items" :key="item[itemId]">
        <td v-for="column of columns">
          <slot :name="column.value" :item :column>
            {{ item[column.value] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style></style>
