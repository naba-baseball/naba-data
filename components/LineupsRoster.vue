<script lang="ts" setup>
const lineupsStore = useLineupsStore()
const { ratingKeys } = toRefs(lineupsStore)
const players = lineupsStore.playersApi.data;


</script>

<template>
  <section class="flex flex-col gap-sm">
    <h1 class="text-xl font-sans">Players</h1>
    <div class="grid grid-cols-2 gap-sm">
      <v-select
        label="sort"
        :items="ratingKeys"
        item-title="label"
        item-value="key"
      ></v-select>
      <v-select
        label="sort direction"
        :items="['ascending', 'descending']"
      ></v-select>
    </div>
    <ul class="grid grid-cols-2 gap-xs">
      <VSlideXReverseTransition group>
        <VCard
          v-for="player of players"
          :key="`roster-${player.player_id}`"
          tag="li"
        >
          <VCardTitle class="!flex justify-between">
            <div class="w-min">
              <div>
                {{ player.position }} {{ player.first_name }}
                {{ player.last_name }}
              </div>
              <div class="flex gap-sm text-surface-700 text-xs uppercase">
                <div>Age {{ player.age }}</div>
                <div>Bats {{ player.bats }}</div>
              </div>
            </div>
            <VBtn @click="lineupsStore.addPlayer(player)" variant="flat" icon="mdi-plus" />
          </VCardTitle>
          <VCardText>
            <ul class="flex gap-sm">
              <li v-for="option of ratingKeys">
                <div>
                  {{ option.label }}:
                  <span :data-rating="player[option.key]">
                    {{ player[option.key] }}
                  </span>
                </div>
              </li>
            </ul>
          </VCardText>
        </VCard>
      </VSlideXReverseTransition>
    </ul>
  </section>
</template>

<style></style>
