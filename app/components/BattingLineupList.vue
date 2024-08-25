<script lang="ts" setup>
const props = withDefaults(defineProps<{ players?: TeamBatter[] }>(), { players: () => [] })
const clonedPlayers = ref<TeamBatter[]>([])
watchEffect(() => {
  clonedPlayers.value = props.players?.map(player => ({ ...player })) ?? []
})
const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => ({ label: getAbbreviatedPosition(num), value: num }))
function bindPlayer(key: string, player: TeamBatter) {
  return {
    value: player[key],
    onChange: (value: string) => {
      clonedPlayers.value.find(p => p.player_id === player.player_id)![key] = value
    },
  }
}
</script>

<template>
  <LineupList :players="clonedPlayers" title="Lineup vs LHP">
    <template #prepend-th>
      <th scope="col">
        Bats
      </th>
    </template>
    <template #append-th>
      <th scope="col">
        Position
      </th>
    </template>
    <template #prepend-td="{ player }">
      <td>
        {{ getHandAbbreviation(player.bats) }}
      </td>
    </template>
    <template #append-td="{ player }">
      <td>
        <USelect v-bind="bindPlayer('position', player)" :options />
      </td>
    </template>
    <template #name="{ player, index }">
      <div class="leading-snug">
        {{ player.first_name }} {{ player.last_name }} <br>
        <span v-if="index + 1 > 9" class="text-xs block font-semibold">
          Backup
        </span>
        <span class="text-xs opacity-70 tabular-nums">
          C {{ player.contact }} G {{ player.gap }} P {{ player.power }} E {{ player.eye }} K {{ player.strikeouts }}
        </span>
      </div>
    </template>
  </LineupList>
</template>

<style>

</style>
