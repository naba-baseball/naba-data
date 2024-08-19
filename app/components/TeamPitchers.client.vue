<script lang="ts" setup>
import type { UnwrapRef } from 'vue'
import type { TeamTableProps } from '~~/types/shared.js'

export type TeamPitchersItem = UnwrapRef<typeof players>[number]
const props = defineProps<TeamTableProps>()
const { players, total, page, sortBy } = useTeamPlayers(() => props.teamId, 'pitchers')
const model = defineModel<UnwrapRef<typeof players>[]>()
const columns = [
  { key: 'last_name', label: 'Name', sortable: true },
  { key: 'throws', label: 'Throws', sortable: true },
  { key: 'age', label: 'Age', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'stuff', label: 'Stuff', sortable: true },
  { key: 'movement', label: 'Movement', sortable: true },
  { key: 'control', label: 'Control', sortable: true },
]
</script>

<template>
  <div>
    <UPagination v-model="page" :total :page-count="15" />
    <UTable v-model="model" v-model:sort="sortBy" by="player_id" :rows="players" :columns>
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
        {{ useHandAbbreviation(row.throws).value }}
      </template>
      <template v-for="rating of ['stuff', 'movement', 'control']" #[`${rating}-data`]="{ row, column, getRowData }" :key="rating">
        <div :data-rating="getRowData(row, column.key)">
          {{ getRowData(row, column.key) }}
        </div>
      </template>
    </UTable>
  </div>
</template>
