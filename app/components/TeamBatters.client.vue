<script lang="ts" setup>
import type { TeamTableProps } from '~~/types/shared.js'

const props = defineProps<TeamTableProps>()
const { players, total, page, sortBy } = useTeamPlayers(() => props.teamId, 'batters')
const model = defineModel<TeamBatter[]>()
const columns = [
  { key: 'last_name', label: 'Name', sortable: true },
  { key: 'other', label: '' },
  { key: 'bats', label: 'Bats', sortable: true },
  { key: 'age', label: 'Age', sortable: true },
  { key: 'position', label: 'Position', sortable: true },
  { key: 'contact', label: 'Contact', sortable: true },
  { key: 'gap', label: 'Gap', sortable: true },
  { key: 'power', label: 'Power', sortable: true },
  { key: 'eye', label: 'Eye', sortable: true },
  { key: 'strikeouts', label: 'Ks', sortable: true },
]
</script>

<template>
  <div>
    <UPagination v-model="page" :total :page-count="15" />
    <UTable v-model="model" v-model:sort="sortBy" by="player_id" :rows="players" :columns>
      <template #last_name-data="{ row }">
        <a class="underline underline-dashed underline-gray-300 underline-offset-4" :href="`https://nabaleague.com/players/player_${row.player_id}`">
          {{ row.first_name }} {{ row.last_name }}
        </a>
      </template>
      <template #position-data="{ row }">
        {{ usePositionDisplay(row, row.position).value }}
      </template>
      <template #bats-data="{ row }">
        {{ getHandAbbreviation(row.bats) }}
      </template>
      <template
        v-for="rating of ['contact', 'eye', 'gap', 'power', 'strikeouts'] as const"
        #[`${rating}-data`]="{ row, column, getRowData }"
        :key="rating"
      >
        <div :data-rating="getRowData(row, column.key)">
          {{ getRowData(row, column.key) }}
        </div>
      </template>
      <template #other-data="{ row }">
        <UButton variant="ghost" :to="`/players/${row.player_id}`">
          Stats
        </UButton>
      </template>
    </UTable>
  </div>
</template>
