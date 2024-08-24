<script lang="ts" setup>
const props = withDefaults(defineProps<{ players?: TeamBatter[] }>(), { players: () => [] })
const clonedPlayers = ref<TeamBatter[]>([])
watchEffect(() => {
  clonedPlayers.value = props.players?.map(player => ({ ...player })) ?? []
})
const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => ({ label: getAbbreviatedPosition(num), value: num }))
</script>

<template>
  <LineupList :players="players" title="Lineup vs LHP">
    <template #prepend-th>
      <th>
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
        <USelect v-model="player.position" :options />
      </td>
    </template>
  </LineupList>
</template>

<style>

</style>
