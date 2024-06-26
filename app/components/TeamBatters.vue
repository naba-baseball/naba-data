<script lang="ts" setup>
import type { UnwrapRef } from 'vue'
import type { TeamTableProps } from '~~/types/shared.js'

export type TeamBattersItem = UnwrapRef<typeof players>[number]
const props = defineProps<TeamTableProps>()
const defaultColumns = [
  { key: 'name', label: 'Name' },
  { key: 'bats', label: 'Bats', sortable: true },
  { key: 'age', label: 'Age', sortable: true },
  { key: 'position', label: 'Position', sortable: true },
  { key: 'contact', label: 'Contact', sortable: true },
  { key: 'gap', label: 'Gap', sortable: true },
  { key: 'power', label: 'Power', sortable: true },
  { key: 'eye', label: 'Eye', sortable: true },
  { key: 'strikeouts', label: 'Ks', sortable: true },
]
const { players } = useTeamPlayers(() => props.teamId)
const model = defineModel<UnwrapRef<typeof players>[]>()
</script>

<template>
  <UTable v-model="model" by="id"  :rows="players" :columns="defaultColumns">
    <template #name-data="{ row }">
      <a class="underline underline-dashed underline-gray-300 underline-offset-[0.25rem]" :href="`https://nabaleague.com/players/player_${row.player_id}`">
        {{ row.first_name }} {{ row.last_name }}
      </a>
    </template>
    <template #position-data="{ row }">
      {{ usePositionDisplay(row, row.position).value }}
    </template>
    <template #bats-data="{ row }">
      {{ useHandAbbreviation(row.bats).value }}
    </template>
    <template
      v-for="rating of ['contact', 'eye', 'gap', 'power', 'strikeouts']"
      #[`${rating}-data`]="{ row, column, getRowData }"
      :key="rating"
    >
      <div :data-rating="getRowData(row, column.key)">
        {{ getRowData(row, column.key) }}
      </div>
    </template>
  </UTable>
</template>
