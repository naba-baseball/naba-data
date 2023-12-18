<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'
import type { ColumnDef } from '@tanstack/vue-table'

const query = reactive({
  skip: useRouteQuery('skip', '0', { transform: Number }),
  limit: useRouteQuery('limit', '0', { transform: Number }),
  position: useRouteQuery('position', 'all'),
  split: useRouteQuery('split', 'batting_overall'),
})
const limit = computedEager(() => query.limit)
const skip = computedEager(() => query.skip)
const position = computedEager(() => query.position)

const [{ data: players }, { data: team }] = await Promise.all([
  useFetch(`/api/teams/${useRoute().params.teamId}/players`, {
    query: {
      skip,
      limit,
      position,
    },
    deep: false,
  }),
  useFetch(`/api/teams/${useRoute().params.teamId}`, { deep: false }),
])

const positionOptions = [
  { value: '1', label: 'Pitchers' },
  { value: '2', label: 'Catchers' },
  { value: '3', label: 'First Basemen' },
  { value: '4', label: 'Second Basemen' },
  { value: '5', label: 'Third Basemen' },
  { value: '6', label: 'Shortstops' },
  { value: '7', label: 'Left Fielders' },
  { value: '8', label: 'Center Fielders' },
  { value: '9', label: 'Right Fielders' },
]
const splitOptions = [
  { value: 'vsl', label: 'vs. Left' },
  { value: 'vsr', label: 'vs. Right' },
  { value: 'talent', label: 'Potential' },

]
const rosterType = ref(2)
const sortBy = ref('position')
const filteredPlayers = computed(() => {
  const primaryRoster = team.value.data.roster.filter(entry => entry.list_id === rosterType.value).map(entry => entry.player_id)
  return players.value.data?.filter(player => primaryRoster.includes(player.player_id))
    .toSorted((a, b) => a[sortBy.value] - b[sortBy.value]) ?? []
})

const battingLabels: ColumnDef<any>[] = [
  { header: () => h('div', { class: 'text-right' }, 'BAPIP'), accessorKey: 'batting.batting_ratings_overall_babip', cell: ({ cell }) => h('div', { 'class': 'text-right', 'data-rating': cell.getValue() }, cell.getValue() as number) },
  { header: () => h('div', { class: 'text-right' }, 'Contact'), accessorKey: 'batting.batting_ratings_overall_contact', cell: ({ cell }) => h('div', { 'class': 'text-right', 'data-rating': cell.getValue() }, cell.getValue() as number) },
  { header: () => h('div', { class: 'text-right' }, 'Eye'), accessorKey: 'batting.batting_ratings_overall_eye', cell: ({ cell }) => h('div', { 'class': 'text-right', 'data-rating': cell.getValue() }, cell.getValue() as number) },
  { header: () => h('div', { class: 'text-right' }, 'Gap'), accessorKey: 'batting.batting_ratings_overall_gap', cell: ({ cell }) => h('div', { 'class': 'text-right', 'data-rating': cell.getValue() }, cell.getValue() as number) },
  { header: () => h('div', { class: 'text-right' }, 'HP'), accessorKey: 'batting.batting_ratings_overall_hp', cell: ({ cell }) => h('div', { 'class': 'text-right', 'data-rating': cell.getValue() }, cell.getValue() as number) },
  { header: () => h('div', { class: 'text-right' }, 'Power'), accessorKey: 'batting.batting_ratings_overall_power', cell: ({ cell }) => h('div', { 'class': 'text-right', 'data-rating': cell.getValue() }, cell.getValue() as number) },
  { header: () => h('div', { class: 'text-right' }, 'Strikeouts'), accessorKey: 'batting.batting_ratings_overall_strikeouts', cell: ({ cell }) => h('div', { 'class': 'text-right', 'data-rating': cell.getValue() }, cell.getValue() as number) },
]
const pitchingLabels = [
  { header: 'balk', accessorKey: 'balk' },
  { header: 'control', accessorKey: 'control' },
  { header: 'hp', accessorKey: 'hp' },
  { header: 'movement', accessorKey: 'movement' },
  { header: 'stuff', accessorKey: 'stuff' },
  { header: 'wild_pitch', accessorKey: 'wild_pitch' },
]
const pitchesLabels = [
  { header: 'changeup', accessorKey: 'changeup' },
  { header: 'circlechange', accessorKey: 'circlechange' },
  { header: 'curveball', accessorKey: 'curveball' },
  { header: 'cutter', accessorKey: 'cutter' },
  { header: 'fastball', accessorKey: 'fastball' },
  { header: 'forkball', accessorKey: 'forkball' },
  { header: 'knuckleball', accessorKey: 'knuckleball' },
  { header: 'knucklecurve', accessorKey: 'knucklecurve' },
  { header: 'screwball', accessorKey: 'screwball' },
  { header: 'sinker', accessorKey: 'sinker' },
  { header: 'slider', accessorKey: 'slider' },
  { header: 'splitter', accessorKey: 'splitter' },
]
const ratingsLabels = computed(() => {
  const [rating, split] = query.split.split('_')
  if (rating === 'batting')
    return battingLabels
  if (rating === 'pitching') {
    if (split === 'talent')
      return [...pitchesLabels, ...pitchingLabels]
    if (split === 'pitches')
      return pitchesLabels
    return pitchingLabels
  }
  return []
})

const headers = computed<ColumnDef<{ player_id: string, first_name: string, last_name: string, age: number }>>(() => [
  { header: 'Name', accessorFn: item => `${item.last_name}, ${item.first_name}` },
  { header: 'Position', accessorKey: 'position' },
  { header: 'Age', accessorKey: 'age' },
  ...ratingsLabels.value,
])

const splits = computed(() => {
  return filteredPlayers.value?.map((player) => {
    const [rating, split] = query.split.split('_')
    return ratingsKeys[rating][split].map(key => player[rating][key])
  }) ?? []
})
</script>

<template>
  <article>
    <h1 v-if="team">
      {{ team.data?.name }}, {{ team.data?.nickname }}
    </h1>
    <fieldset>
      <legend> Roster</legend>
      <label>
        Primary
        <input v-model.number="rosterType" :value="2" type="radio" name="roster">
      </label> <br>
      <label>
        Reserve
        <input v-model.number="rosterType" :value="1" type="radio" name="roster">
      </label>
    </fieldset>
    <fieldset>
      <legend> filters </legend>
      <label for="position">Position</label>
      <select id="position" v-model="query.position" name="position">
        <option value="all" selected>
          all
        </option>
        <option value="batters">
          Batters
        </option>
        <option value="pitchers">
          Pitchers
        </option>
      </select>
      <label name="split" for="split">Split</label>
      <select id="split" v-model="query.split">
        <optgroup label="Batting">
          <option value="batting_overall" selected>
            overall
          </option>
          <option v-for="option of splitOptions" :key="`batting_${option.value}`" :value="`batting_${option.value}`">
            {{ option.label }}
          </option>
        </optgroup>
        <optgroup label="Pitching">
          <option value="pitching_overall" selected>
            overall
          </option>
          <option v-for="option of splitOptions" :key="`pitching_${option.value}`" :value="`pitching_${option.value}`">
            {{ option.label }}
          </option>
        </optgroup>
      </select>
    </fieldset>
    <stats-table :columns="headers" :data="filteredPlayers" />
  </article>
</template>
