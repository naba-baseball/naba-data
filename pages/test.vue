<script lang="ts" setup>
const {
  execute: getPitching,
  data: pitching,
  pending
} = await useLazyFetch('/api/pitching/1')
const { execute: putPitching } = await useFetch('/api/pitching', {
  method: 'put',
  immediate: false
})

const { data: headers } = await useFetch('/api/columns', { key: 'COLUMNS' })
</script>

<template>
  <div>
    <button @click="putPitching">putPitching</button>
    <button @click="getPitching">getPitching</button>
    <table>
      <thead>
        <th v-for="header of headers" :key="header">
          {{ header }}
        </th>
      </thead>
      <div v-if="pending">loading...</div>
      <tbody>
        <tr v-for="row of pitching">
          <td v-for="header of headers">
            {{ row[header] }}
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      {{ pitching }}
    </div>
  </div>
</template>

<style></style>
