<script lang="ts" setup>
const props = withDefaults(defineProps<{ players?: TeamPitcher[] }>(), { players: () => [] })
const clonedPlayers = ref<TeamPitcher[]>([])
watchEffect(() => {
  clonedPlayers.value = props.players?.map(player => ({ ...player })) ?? []
})
const options = [11, 12, 13].map(num => ({ label: getAbbreviatedRole(num), value: num }))
</script>

<template>
  <LineupList :players="clonedPlayers" title="Lineup vs LHP">
    <template #prepend-th>
      <th>
        Throws
      </th>
    </template>
    <template #append-th>
      <th scope="col">
        Position
      </th>
    </template>
    <template #prepend-td="{ player }">
      <td>
        {{ getHandAbbreviation(player.throws) }}
      </td>
    </template>
    <template #append-td="{ player }">
      <td>
        <USelect v-model="player.role" :options />
      </td>
    </template>
  </LineupList>
</template>

<style>

</style>
