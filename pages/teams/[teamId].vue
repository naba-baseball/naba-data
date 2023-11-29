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
const filteredPlayers = computed(() => {
  const primaryRoster = team.value.data.roster.filter(entry => entry.list_id === rosterType.value).map(entry => entry.player_id)
  return players.value.data?.filter(player => primaryRoster.includes(player.player_id)) ?? []
})

const battingLabels = [
  'babip',
  'contact',
  'eye',
  'gap',
  'hp',
  'power',
  'strikeouts',
]
const pitchingLabels = [
  'balk',
  'control',
  'hp',
  'movement',
  'stuff',
  'wild_pitch',
]
const pitchesLabels = [
  'changeup',
  'circlechange',
  'curveball',
  'cutter',
  'fastball',
  'forkball',
  'knuckleball',
  'knucklecurve',
  'screwball',
  'sinker',
  'slider',
  'splitter',
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
    talent: [
      'batting_ratings_talent_babip',
      'batting_ratings_talent_contact',
      'batting_ratings_talent_eye',
      'batting_ratings_talent_gap',
      'batting_ratings_talent_hp',
      'batting_ratings_talent_power',
      'batting_ratings_talent_strikeouts',
    ],
  },
  pitching: {
    overall: [
      'pitching_ratings_overall_balk',
      'pitching_ratings_overall_control',
      'pitching_ratings_overall_hp',
      'pitching_ratings_overall_movement',
      'pitching_ratings_overall_stuff',
      'pitching_ratings_overall_wild_pitch',
    ],
    vsl: [
      'pitching_ratings_vsl_balk',
      'pitching_ratings_vsl_control',
      'pitching_ratings_vsl_hp',
      'pitching_ratings_vsl_movement',
      'pitching_ratings_vsl_stuff',
      'pitching_ratings_vsl_wild_pitch',
    ],
    vsr: [
      'pitching_ratings_vsr_balk',
      'pitching_ratings_vsr_control',
      'pitching_ratings_vsr_hp',
      'pitching_ratings_vsr_movement',
      'pitching_ratings_vsr_stuff',
      'pitching_ratings_vsr_wild_pitch',
    ],
    pitches: [
      'pitching_ratings_pitches_changeup',
      'pitching_ratings_pitches_circlechange',
      'pitching_ratings_pitches_curveball',
      'pitching_ratings_pitches_cutter',
      'pitching_ratings_pitches_fastball',
      'pitching_ratings_pitches_forkball',
      'pitching_ratings_pitches_knuckleball',
      'pitching_ratings_pitches_knucklecurve',
      'pitching_ratings_pitches_screwball',
      'pitching_ratings_pitches_sinker',
      'pitching_ratings_pitches_slider',
      'pitching_ratings_pitches_splitter',
    ],
    talent: [
      'pitching_ratings_pitches_talent_changeup',
      'pitching_ratings_pitches_talent_circlechange',
      'pitching_ratings_pitches_talent_curveball',
      'pitching_ratings_pitches_talent_cutter',
      'pitching_ratings_pitches_talent_fastball',
      'pitching_ratings_pitches_talent_forkball',
      'pitching_ratings_pitches_talent_knuckleball',
      'pitching_ratings_pitches_talent_knucklecurve',
      'pitching_ratings_pitches_talent_screwball',
      'pitching_ratings_pitches_talent_sinker',
      'pitching_ratings_pitches_talent_slider',
      'pitching_ratings_pitches_talent_splitter',
      'pitching_ratings_talent_balk',
      'pitching_ratings_talent_control',
      'pitching_ratings_talent_hp',
      'pitching_ratings_talent_movement',
      'pitching_ratings_talent_stuff',
      'pitching_ratings_talent_wild_pitch',
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
