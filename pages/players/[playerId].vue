<script lang="ts" setup>
const { data: player } = await useFetch(
  `/api/players/${useRoute().params.playerId}`,
  { default: () => ({}) },
);
</script>

<template>
  <div class="player-details">
    <details>
      <summary data-exception="asfd">Details</summary>
      <table>
        <thead>
          <tr>
            <th v-for="key of Object.keys(player)" :key="key">
              {{ key }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="value of Object.values(player)" :key="value">
              {{ value }}
            </td>
          </tr>
        </tbody>
      </table>
    </details>
    <details>
      <summary>batting</summary>
      <dl>
        <template
          v-for="[key, val] of Object.entries(player.batting)"
          :key="key"
        >
          <dt>
            {{ key }}
          </dt>
          <dd>{{ val }}</dd>
        </template>
      </dl>
    </details>
    <details>
      <summary>pitching</summary>
      <dl>
        <template
          v-for="[key, val] of Object.entries(player.pitching)"
          :key="key"
        >
          <dt>
            {{ key }}
          </dt>
          <dd>{{ val }}</dd>
        </template>
      </dl>
    </details>
    <details>
      <summary>fielding</summary>
      <dl>
        <template
          v-for="[key, val] of Object.entries(player.fielding)"
          :key="key"
        >
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
