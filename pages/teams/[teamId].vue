<script lang="ts" setup>
const query = ref({
  skip: 0,
  limit: 20,
})
const total = ref(0)
const { data: players } = await useLazyFetch(`/api/teams/${useRoute().params.teamId}/players`, {
  query,
  onResponse(ctx) {
    total.value = Number(ctx.response.headers.get('x-total-count')) ?? 0
  },
})
watchEffect(() => players.value = players.value?.toSorted((a, b) => a.position - b.position))
// fetch team details
const { data: team } = await useFetch(`/api/teams/${useRoute().params.teamId}`)
</script>

<template>
  <article>
    <h1>
      {{ team.name }}, {{ team.nickname }}
    </h1>
    <label for="position">Position</label>
    <select id="position" v-model="query.position">
      <option selected />
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
    <button @click="() => { query.skip += 20 }">
      fetch next
    </button>
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>position</th>
          <th>age</th>
          <th>role</th>
          <th>id</th>
          <th>team id</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player of players" :key="player.player_id">
          <td>{{ player.last_name }}, {{ player.first_name }}</td>
          <td>{{ usePositionDisplay(player).value }}</td>
          <td>{{ player.role }}</td>
          <td>{{ player.player_id }}</td>
          <td>{{ player.team_id }}</td>
        </tr>
      </tbody>
      <tfoot>
        total: {{ total }}
      </tfoot>
    </table>
  </article>
</template>

<style></style>
