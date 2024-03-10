<script lang="ts" setup generic="M, T extends string, V extends string">
import type { F } from "ts-toolbelt";
type TItem = { [key in T]: string } | { text?: string };
type VItem = { [key in V]: F.NoInfer<M> } | { value?: F.NoInfer<M> };

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
</script>

<template>
  <label class="field-container">
    <div class="text-label">{{ label }}</div>
    <select name="split" class="field-input" v-model="model">
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
