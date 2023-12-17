<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'

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

const battingLabels = [
  { label: 'BABIP', value: 'batting_ratings_overall_babip' },
  { label: 'Contact', value: 'batting_ratings_overall_contact' },
  { label: 'Eye', value: 'batting_ratings_overall_eye' },
  { label: 'Gap', value: 'batting_ratings_overall_gap' },
  { label: 'HP', value: 'batting_ratings_overall_hp' },
  { label: 'Power', value: 'batting_ratings_overall_power' },
  { label: 'Strikeouts', value: 'batting_ratings_overall_strikeouts' },
]
const pitchingLabels = [
  { label: 'balk', value: 'balk' },
  { label: 'control', value: 'control' },
  { label: 'hp', value: 'hp' },
  { label: 'movement', value: 'movement' },
  { label: 'stuff', value: 'stuff' },
  { label: 'wild_pitch', value: 'wild_pitch' },
]
const pitchesLabels = [
  { label: 'changeup', value: 'changeup' },
  { label: 'circlechange', value: 'circlechange' },
  { label: 'curveball', value: 'curveball' },
  { label: 'cutter', value: 'cutter' },
  { label: 'fastball', value: 'fastball' },
  { label: 'forkball', value: 'forkball' },
  { label: 'knuckleball', value: 'knuckleball' },
  { label: 'knucklecurve', value: 'knucklecurve' },
  { label: 'screwball', value: 'screwball' },
  { label: 'sinker', value: 'sinker' },
  { label: 'slider', value: 'slider' },
  { label: 'splitter', value: 'splitter' },
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

const headers = computed(() => [
  { label: 'Name', value: item => `${item.last_name}, ${item.first_name}` },
  { label: 'Position', value: 'position' },
  { label: 'Age', value: 'age' },
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
    <table>
      <thead>
        <tr>
          <th />
          <th @click="sortBy = 'name'">
            name
          </th>
          <th @click="sortBy = 'position'">
            position
          </th>
          <th @click="sortBy = 'age'">
            age
          </th>
          <th v-for="label of ratingsLabels" :key="label.value">
            {{ label.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, i) of filteredPlayers" :key="player._id">
          <td>
            <nuxt-link :to="`/players/${player.player_id}`">
              details
            </nuxt-link>
          </td>
          <td>{{ player.last_name }}, {{ player.first_name }}</td>
          <td>{{ usePositionDisplay(player).value }}</td>
          <td>{{ player.age }}</td>
          <!-- eslint-disable-next-line vue/require-v-for-key -->
          <td v-for="split of splits[i]" :data-rating="split">
            {{ split }}
          </td>
        </tr>
      </tbody>
    </table>
  </article>
</template>
