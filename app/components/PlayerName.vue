<script lang="ts" setup>
const props = defineProps<{ playerId: number | string }>()
const { data: player } = useLazyFetch(() => `/api/players/${props.playerId}`, {
  dedupe: 'defer',
  onRequest: (ctx) => {
    if (props.playerId == null) {
      const aborter = new AbortController()
      ctx.options.signal = aborter.signal
      aborter.abort()
    }
  },
})
</script>

<template>
  <span>
    <slot v-if="player" :player>
      {{ player?.first_name }} {{ player?.last_name }}
    </slot>
  </span>
</template>

<style>

</style>
