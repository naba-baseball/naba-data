<script lang="ts" setup>
const props = defineProps<{ playerId: number | string }>()
const { data: player } = useLazyFetch(`/api/players/${props.playerId}`, { dedupe: 'defer' })
</script>

<template>
  <span>
    {{ player?.last_name }}, {{ player?.first_name }}
  </span>
</template>

<style>

</style>
