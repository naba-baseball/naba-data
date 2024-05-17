<script lang="ts" setup>
const teamId = ref<number | string>(0)
const selected = ref<Player[]>([])
</script>

<template>
  <div>
    <h1 heading>
      Lineup tool (WIP)
    </h1>
    <article>
      <div grid="~ cols-[1fr_2fr]">
        <div>
          <TeamSelect v-model="teamId" />
          <TeamBatters v-model="selected" selectable :team-id />
        </div>
        <div>
          <h2>
            Lineup
          </h2>
          <ol>
            <li v-for="player of selected" :key="player.player_id">
              {{ player.name }}
            </li>
          </ol>
        </div>
      </div>
    </article>
  </div>
</template>

<style>

</style>
