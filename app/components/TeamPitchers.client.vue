<script lang="ts" setup>
import type { TeamTableProps } from '~~/types/shared.js'

const props = defineProps<TeamTableProps>()
const { players } = useTeamPlayers(() => props.teamId, 'pitchers')
const model = defineModel<TeamPitcher[]>()
const columns = [
  { key: 'last_name', label: 'Name', sortable: true },
  { key: 'throws', label: 'Throws', sortable: true },
  { key: 'age', label: 'Age', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'stuff', label: 'Stuff', sortable: true },
  { key: 'movement', label: 'Movement', sortable: true },
  { key: 'control', label: 'Control', sortable: true },
  { key: 'stamina', label: 'Stamina', sortable: true },
]
</script>

<template>
  <UTable v-model="model" by="player_id" :rows="players" :columns>
    <template #last_name-data="{ row }">
      <a
        class="underline underline-dashed underline-surface-300 underline-offset-[0.25rem]"
        :href="`https://nabaleague.com/players/player_${row.player_id}`"
      >
        {{ row.first_name }} {{ row.last_name }}
      </a>
    </template>
    <template #role-data="{ row }">
      {{ getAbbreviatedRole(row.role) }}
    </template>
    <template #throws-data="{ row }">
      {{ getHandAbbreviation(row.throws) }}
    </template>
    <template v-for="rating of ['stuff', 'movement', 'control', 'stamina'] as const" #[`${rating}-data`]="{ row, column, getRowData }" :key="rating">
      <div :data-rating="getRowData(row, column.key)">
        {{ getRowData(row, column.key) }}
      </div>
    </template>
  </UTable>
</template>
