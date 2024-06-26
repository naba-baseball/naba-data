<script lang="ts" setup>
import type { UnwrapRef } from 'vue'
import type { TeamTableProps } from '~~/types/shared.js'

export type TeamPitchersItem = UnwrapRef<typeof players>[number]
const props = defineProps<TeamTableProps>()
const defaultColumns = [
  { label: 'Name', key: 'name' },
  { label: 'Throws', key: 'throws', sortable: true },
  { label: 'Age', key: 'age', sortable: true },
  { label: 'Role', key: 'role', sortable: true },
  { label: 'Stuff', key: 'stuff', sortable: true },
  { label: 'Movement', key: 'movement', sortable: true },
  { label: 'Control', key: 'control', sortable: true },
]
const { split, roster } = useTeamsFilters()
const { data: players } = await useFetch(
  () => `/api/teams/${props.teamId}/pitchers`,
  {
    query: {
      split,
      roster,
    },
    default: () => [],
  },
)
</script>

<template>
  <UTable :rows="players" :columns="defaultColumns">
    <template #name-data="{ row }">
      <a
        class="underline underline-dashed underline-surface-300 underline-offset-[0.25rem]"
        :href="`https://nabaleague.com/players/player_${row.player_id}`"
      >
        {{ row.first_name }} {{ row.last_name }}
      </a>
    </template>
    <template #throws-data="{ row }">
      {{ useHandAbbreviation(row.throws).value }}
    </template>
    <template v-for="rating of ['stuff', 'movement', 'control']" #[`${rating}-data`]="{ row, column, getRowData }" :key="rating">
      <div :data-rating="getRowData(row, column.key)">
        {{ getRowData(row, column.key) }}
      </div>
    </template>
  </UTable>
</template>
