<script
  lang="ts"
  setup
  generic="
    M,
    T extends string,
    V extends string,
    I extends { [key in V]: M } & { [key in T]: string }
  "
>
const props = withDefaults(
  defineProps<{
    label: string;
    items: I[];
    itemText?: T;
    itemValue?: V;
  }>(),
  {
    items: () => [],
    itemText: "text",
    itemValue: "value",
  },
);
props.itemText
const model = defineModel<M>();
</script>

<template>
  <label class="field-container">
    <div class="text-label">{{ label }}</div>
    <select name="split" class="field-input" v-model="model">
      <option v-for="item of items" :value="item[itemValue]" :key="value">
        {{ item[itemText] }}
      </option>
    </select>
  </label>
</template>

<style></style>
