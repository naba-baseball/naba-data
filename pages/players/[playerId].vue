<script lang="ts" setup>
const { data: details } = await useLazyFetch(`/api/players/${useRoute().params.playerId}`, { default: () => ({}) })
const { data: batting } = await useLazyFetch(`/api/batting/${useRoute().params.playerId}`, { default: () => ({}) })
const { data: pitching } = await useLazyFetch(`/api/pitching/${useRoute().params.playerId}`, { default: () => ({}) })
const { data: fielding } = await useLazyFetch(`/api/fielding/${useRoute().params.playerId}`, { default: () => ({}) })
</script>

<template>
  <div class="player-details">
    <details>
      <summary>
        Details
      </summary>
      <table>
        <thead>
          <tr>
            <th v-for="key of Object.keys(details)">
              {{ key }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="value of Object.values(details)">
              {{ value }}
            </td>
          </tr>
        </tbody>
      </table>
    </details>
    <details>
      <summary>
        batting
      </summary>
      <dl>
        <template v-for=" [key, val] of Object.entries(batting)">
          <dt>
            {{ key }}
          </dt>
          <dd>{{ val }}</dd>
        </template>
      </dl>
    </details>
    <details>
      <summary>
        pitching
      </summary>
      <dl>
        <template v-for=" [key, val] of Object.entries(pitching)">
          <dt>
            {{ key }}
          </dt>
          <dd>{{ val }}</dd>
        </template>
      </dl>
    </details>
    <details>
      <summary>
        fielding
      </summary>
      <dl>
        <template v-for=" [key, val] of Object.entries(fielding)">
          <dt>
            {{ key }}
          </dt>
          <dd>{{ val }}</dd>
        </template>
      </dl>
    </details>
  </div>
</template>

<style>
.player-details {
  display: flex;
  flex-direction: column;
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr; */
}
</style>
