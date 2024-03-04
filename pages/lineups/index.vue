<script lang="ts" setup>
const lineupsStore = useLineupsStore();
await lineupsStore.playersApi.execute();
</script>

<template>
  <div fluid>
    <article class="flex flex-col gap-sm">
      <LineupsFilters />
      <div class="grid grid-cols-2 gap-sm">
        <lineups-roster />
        <lineups-lineup />
      </div>
    </article>
  </div>
</template>
