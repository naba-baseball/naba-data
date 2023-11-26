<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'

const query = reactive({
  skip: useRouteQuery('skip', '0', { transform: Number }),
  limit: useRouteQuery('limit', '0', { transform: Number }),
  position: useRouteQuery('position', 'all'),
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
</script>

<template>
  <article>
    <h1 v-if="team">
      {{ team.data?.name }}, {{ team.data?.nickname }}
    </h1>
    <label for="position">Position</label>
    <select id="position" v-model="query.position">
      <option selected>
        all
      </option>
      <option value="1">
        Pitchers
      </option>
      <option value="2">
        Catchers
      </option>
      <option value="3">
        First Basemen
      </option>
      <option value="4">
        Second Basemen
      </option>
      <option value="5">
        Third Basemen
      </option>
      <option value="6">
        Shortstops
      </option>
      <option value="7">
        Left Fielders
      </option>
      <option value="8">
        Center Fielders
      </option>
      <option value="9">
        Right Fielders
      </option>
    </select>
    <!-- <button @click="() => { query.skip += 20 }">
      fetch next
    </button> -->
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>position</th>
          <th>age</th>
          <th>team</th>
          <th>view player</th>
          <th> contact </th>
          <th> power </th>
          <th> gap</th>
          <th> eye </th>
          <th> Avoid Ks </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player of players?.data" :key="player.player_id">
          <td>{{ player.last_name }}, {{ player.first_name }}</td>
          <td>{{ usePositionDisplay(player).value }}</td>
          <td>{{ player.age }}</td>
          <td>{{ player.teamId }}</td>
          <td>
            <nuxt-link :to="`/players/${player.player_id}`">
              details
            </nuxt-link>
          </td>
          <td>
            {{ player.batting.batting_ratings_overall_contact }}
          </td>
          <td>
            {{ player.batting.batting_ratings_overall_power }}
          </td>
          <td>
            {{ player.batting.batting_ratings_overall_gap }}
          </td>
          <td>
            {{ player.batting.batting_ratings_overall_eye }}
          </td>
          <td>
            {{ player.batting.batting_ratings_overall_strikeouts }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        total: {{ players?.meta.count }}
      </tfoot>
    </table>
  </article>
</template>
