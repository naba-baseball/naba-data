<script lang="ts" setup generic="T extends TeamPitcher | TeamBatter">
withDefaults(defineProps<{
  players?: (T extends { role: number } ? TeamPitcher : T extends { position: number } ? TeamBatter : never)[]
  title: string
}>(), { players: () => [] })
</script>

<template>
  <table class="[&_*]:text-start w-full">
    <caption class="text-xl font-bold">
      {{ title }}
    </caption>
    <thead>
      <tr>
        <th scope="col">
          #
        </th>
        <slot name="prepend-th" />
        <th scope="col">
          Name
        </th>
        <slot name="append-th" />
      </tr>
    </thead>
    <tbody>
      <tr v-for="(player, i) of players" :key="player.player_id">
        <th scope="row">
          {{ i + 1 }}
        </th>
        <slot name="prepend-td" :player :index="i" />
        <td>
          {{ player.first_name }} {{ player.last_name }}
          <span v-if="i > 9" class="block opacity-70">
            Backup
          </span>
        </td>
        <slot name="append-td" :player :index="i" />
      </tr>
    </tbody>
  </table>
</template>

<style>

</style>
