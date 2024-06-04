<script lang="ts" setup>
import type { ColumnDef } from '@tanstack/vue-table'
import type { UnwrapRef } from 'vue'
import type { TeamTableProps } from '~/types/shared.js'

export type TeamPitchersItem = UnwrapRef<typeof players>[number]
const props = defineProps<TeamTableProps>()
const model = defineModel<Record<string, TeamPitchersItem>>({ default: () => ({}) })
const defaultColumns: ColumnDef<TeamPitchersItem>[] = [
  { accessorFn: i => `${i.first_name} ${i.last_name}`, header: 'Name', id: 'name' },
  { accessorFn: i => useHandAbbreviation(i.throws).value, header: 'Throws', id: 'throws' },
  { accessorKey: 'age', header: 'Age', id: 'age' },
  { accessorFn: i => getAbbreviatedRole(i.role), header: 'Role', id: 'role' },
  { accessorKey: 'stuff', header: 'stuff', id: 'stuff' },
  { accessorKey: 'movement', header: 'movement', id: 'movement' },
  { accessorKey: 'control', header: 'control', id: 'control' },
]
const columns = computed(() => defaultColumns)
const { split, roster } = useTeamsFilters()
const { data: players } = await useFetch(
  () => `/api/teams/${props.teamId}/pitchers`,
  {
    deep: false,
    query: {
      split,
      roster,
    },
    default: () => [],
  },
)
</script>

<template>
  <BaseTable v-model="model" :columns :items="players" :selectable :team-id item-id="player_id">
    <template
      v-for="rating of ['stuff', 'control', 'movement']"
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
