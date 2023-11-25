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
  }),
  useFetch(`/api/teams/${useRoute().params.teamId}`),
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="player of players?.data" :key="player.playerId">
          <td>{{ player.lastName }}, {{ player.firstName }}</td>
          <td>{{ usePositionDisplay(player).value }}</td>
          <td>{{ player.age }}</td>
          <td>{{ player.teamId }}</td>
          <td>
            <nuxt-link :to="`/players/${player.playerId}`">
              details
            </nuxt-link>
          </td>
        </tr>
      </tbody>
      <tfoot>
        total: {{ players?.meta.count }}
      </tfoot>
    </table>
  </article>
</template>
