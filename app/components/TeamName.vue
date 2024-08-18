<script lang="ts" setup>
const props = defineProps<{ teamId: number | string }>()
const { data: team } = useLazyFetch(`/api/teams/${props.teamId}`, { dedupe: 'defer' })
</script>

<template>
  <span>
    {{ team?.name }}
  </span>
</template>

<style>

</style>
