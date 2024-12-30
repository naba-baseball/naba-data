<script lang="ts" setup>
const { players = [] } = defineProps<{ players?: TeamPitcher[] }>()
const { cloned: clonedPlayers } = useCloned(() => players)
const options = [
  { label: 'Starter', value: 11 },
  { label: 'Relief', value: 12 },
  { label: 'Middle Relief', value: 14 },
  { label: 'Long Relief', value: 15 },
  { label: 'Setup', value: 16 },
  { label: 'Closer', value: 13 },
  { label: 'Stopper', value: 17 },
  { label: 'Specialist', value: 18 },
]
</script>

<template>
  <LineupList :players="clonedPlayers" title="">
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
    <template #name="{ player }">
      {{ player.first_name }} {{ player.last_name }} <br>
      <span class="text-xs opacity-70 tabular-nums">
        S {{ player.stuff }} M {{ player.movement }} C {{ player.control }} Sta {{ player.stamina }}
      </span>
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
