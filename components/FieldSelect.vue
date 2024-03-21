<script lang="ts" setup generic="M, T extends string, V extends string">
type TItem = { [key in T]: string } | { text?: string };
type VItem = { [key in V]: M } | { value?: M };

type Item = TItem & VItem;
withDefaults(
  defineProps<{
    itemText?: T;
    itemValue?: V;
    items: Item[];
    label: string;
  }>(),
  {
    items: () => [],
    label: "",
    itemText: "text",
    itemValue: "value",
  },
);
const model = defineModel<M>();

defineOptions({ inheritAttrs: false });
</script>

<template>
  <label class="field-container">
    <div class="text-label">{{ label }}</div>
    <select v-bind="$attrs" class="field-input" v-model="model">
      <option
        v-for="item of items"
        :value="item[itemValue as V]"
        :key="item[itemValue as V]"
      >
        {{ item[itemText as T] }}
      </option>
    </select>
  </label>
</template>

<style></style>
