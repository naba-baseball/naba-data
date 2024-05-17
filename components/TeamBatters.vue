<script lang="ts" setup>
const props = defineProps<{ teamId: number | string, selectable?: boolean }>()
const model = defineModel<Player[]>({ default: () => [] })
const defaultColumns = [
  { value: 'name', title: 'Name' },
  { value: 'bats', title: 'Bats' },
  { value: 'age', title: 'Age' },
  { value: 'position', title: 'Position' },
  { value: 'contact', title: 'Contact' },
  { value: 'gap', title: 'Gap' },
  { value: 'power', title: 'Power' },
  { value: 'eye', title: 'Eye' },
  { value: 'strikeouts', title: 'Ks' },
]
const columns = computed(() => {
  if (props.selectable) {
    return [
      { value: 'selected', title: 'Select' },
      ...defaultColumns,
    ]
  }
  return defaultColumns
})
const { split, roster } = useTeamsFilters()
const { data: players } = await useFetch(
  () => `/api/teams/${props.teamId}/batters`,
  {
    deep: false,
    query: {
      split,
      roster,
    },
    default: () => [],
  },
)
type FilteredPlayer = {
  [key in BattingRating]: number;
} & Player & {
  [key: string]: string | number
  name: string
  bats: string
}
const filteredPlayers = shallowRef<FilteredPlayer[]>([])
watch(
  players,
  (players) => {
    filteredPlayers.value = players.map((player) => {
      const tablePlayer = {} as FilteredPlayer
      tablePlayer.player_id = player.player_id
      tablePlayer.age = player.age
      tablePlayer.name = `${player.first_name} ${player.last_name}`
      tablePlayer.bats = useHandAbbreviation(player.bats).value
      tablePlayer.position = player.position
      tablePlayer.contact = player.batting.contact
      tablePlayer.eye = player.batting.eye
      tablePlayer.gap = player.batting.gap
      tablePlayer.power = player.batting.power
      tablePlayer.strikeouts = player.batting.strikeouts
      return tablePlayer
    })
  },
  { immediate: true },
)
</script>

<template>
  <BaseTable
    column-value="value"
    column-text="title"
    sort="position"
    :columns
    :items="filteredPlayers"
    item-id="player_id"
  >
    <template #selected="{ item }">
      <input v-model="model" type="checkbox" :value="{ name: item.name, player_id: item.player_id }">
    </template>
    <template #name="{ item, column }">
      <a class="underline underline-dashed underline-surface-300 underline-offset-[0.25rem]" :href="`https://nabaleague.com/players/player_${item.player_id}`">
        {{ item[column.value] }}
      </a>
    </template>
    <template
      v-for="rating of ['contact', 'eye', 'gap', 'power', 'strikeouts']"
      #[rating]="{ item, column }"
      :key="rating"
    >
      <div :data-rating="item[column.value]">
        {{ item[column.value] }}
      </div>
    </template>
    <template #position="{ item, column }">
      {{ getAbbreviatedPosition(item[column.value]) }}
    </template>
  </BaseTable>
</template>
