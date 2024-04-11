<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'

const split = useRouteQuery<Split>('split', 'overall')
const roster = useRouteQuery<'primary' | 'reserve'>('roster', 'primary')

const columns = [
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
const { data: players } = await useFetch(
  `/api/teams/${useRoute().params.teamId}/batters`,
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
  <div class="flex flex-col gap-6">
    <div class="flex gap-3">
      <SplitSelect v-model="split" />
      <RosterSelect v-model="roster" />
    </div>
    <BaseTable
      column-value="value"
      column-text="title"
      sort="position"
      :columns
      :items="filteredPlayers"
      item-id="player_id"
    >
      <template #name="{ item, column }">
        <a class="underline underline-dashed underline-surface-300 underline-offset-[0.25rem]" :href="`https://nabaleague.com/players/player_${item.player_id}`">
          {{ item[column.value] }}
        </a>
      </template>
      <template
        v-for="rating of ['contact', 'eye', 'gap', 'power', 'strikeouts']" :key="rating"
        #[rating]="{ item, column }"
      >
        <div :data-rating="item[column.value]">
          {{ item[column.value] }}
        </div>
      </template>
      <template #position="{ item, column }">
        {{ getAbbreviatedPosition(item[column.value]) }}
      </template>
    </BaseTable>
  </div>
</template>
