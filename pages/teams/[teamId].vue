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
]
const rosterType = ref(2)
const filteredPlayers = computed(() => {
  const primaryRoster = team.value.data.roster.filter(entry => entry.list_id === rosterType.value).map(entry => entry.player_id)
  return players.value.data?.filter(player => primaryRoster.includes(player.player_id)) ?? []
})

const ratingsLabels = [
  'babip',
  'contact',
  'eye',
  'gap',
  'hp',
  'power',
  'strikeouts',
]

const ratingsKeys = {
  batting: {
    overall: [
      'batting_ratings_overall_babip',
      'batting_ratings_overall_contact',
      'batting_ratings_overall_eye',
      'batting_ratings_overall_gap',
      'batting_ratings_overall_hp',
      'batting_ratings_overall_power',
      'batting_ratings_overall_strikeouts',
    ],
    vsl: [
      'batting_ratings_vsl_babip',
      'batting_ratings_vsl_contact',
      'batting_ratings_vsl_eye',
      'batting_ratings_vsl_gap',
      'batting_ratings_vsl_hp',
      'batting_ratings_vsl_power',
      'batting_ratings_vsl_strikeouts',
    ],
    vsr: [
      'batting_ratings_vsr_babip',
      'batting_ratings_vsr_contact',
      'batting_ratings_vsr_eye',
      'batting_ratings_vsr_gap',
      'batting_ratings_vsr_hp',
      'batting_ratings_vsr_power',
      'batting_ratings_vsr_strikeouts',
    ],
  },
}

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
        <option selected>
          all
        </option>
        <option v-for="option of positionOptions" :key="option.value" :value="option.value">
          {{ option.label }}
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
          <th>name</th>
          <th>position</th>
          <th>age</th>
          <th>team</th>
          <th>view player</th>
          <th v-for="label of ratingsLabels" :key="label">
            {{ label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, i) of filteredPlayers" :key="player._id">
          <td>{{ player.last_name }}, {{ player.first_name }}</td>
          <td>{{ usePositionDisplay(player).value }}</td>
          <td>{{ player.age }}</td>
          <td>{{ player.teamId }}</td>
          <td>
            <nuxt-link :to="`/players/${player.player_id}`">
              details
            </nuxt-link>
          </td>
          <!-- eslint-disable-next-line vue/require-v-for-key -->
          <td v-for="split of splits[i]">
            {{ split }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        total: {{ filteredPlayers.length }}
      </tfoot>
    </table>
  </article>
</template>
