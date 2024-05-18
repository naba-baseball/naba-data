<script lang="ts" setup>
import type { ColumnDef } from '@tanstack/vue-table'
import type { UnwrapRef } from 'vue'
import type { TeamTableProps } from '~/types/shared.js'

export type TeamBattersItem = UnwrapRef<typeof players>[number]
const props = defineProps<TeamTableProps>()
const model = defineModel<Record<string, TeamBattersItem>>({ default: () => ({}) })
const defaultColumns: ColumnDef<TeamBattersItem>[] = [
  { accessorFn: p => `${p.first_name} ${p.last_name}`, header: 'Name', id: 'name' },
  { accessorFn: p => useHandAbbreviation(p.bats).value, header: 'Bats', id: 'bats' },
  { accessorKey: 'age', header: 'Age', id: 'age' },
  { accessorFn: p => getAbbreviatedPosition(p.position), header: 'Position', id: 'position' },
  { accessorKey: 'batting.contact', header: 'Contact', id: 'contact' },
  { accessorKey: 'batting.gap', header: 'Gap', id: 'gap' },
  { accessorKey: 'batting.power', header: 'Power', id: 'power' },
  { accessorKey: 'batting.eye', header: 'Eye', id: 'eye' },
  { accessorKey: 'batting.strikeouts', header: 'Ks', id: 'strikeouts' },
]
const columns = computed(() => defaultColumns)
const { players } = useTeamPlayers(() => props.teamId)
</script>

<template>
  <BaseTable v-model="model" :selectable :columns :items="players" item-id="player_id">
    <template
      v-for="rating of ['contact', 'eye', 'gap', 'power', 'strikeouts']"
      #[rating]="{ row, column }"
      :key="rating"
    >
      <div :data-rating="row.getValue(column.id)">
        {{ row.renderValue(column.id) }}
      </div>
    </template>
    <template #name="{ row, column }">
      <a class="underline underline-dashed underline-surface-300 underline-offset-[0.25rem]" :href="`https://nabaleague.com/players/player_${row.original.player_id}`">
        {{ row.renderValue(column.id) }}
      </a>
    </template>
  </BaseTable>
</template>
