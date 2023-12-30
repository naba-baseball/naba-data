<script lang="ts" setup generic="TData, TValue">
const props = defineProps<{
  data: {label: string,key: string,}[];
  columns: Record<string, any>[];
}>();

</script>

<template>
  <u-table :columns="props.columns" :rows="props.data" />
</template>

<style>

.base-table {
  & tr th {
    min-width: 10ch;
    color: var(--text-color);
  }
}
</style>
