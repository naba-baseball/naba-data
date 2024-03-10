<script lang="ts" setup>
const lineupsStore = useLineupsStore();
const { ratingKeys } = toRefs(lineupsStore);
const players = lineupsStore.playersApi.data;
</script>

<template>
  <section class="flex flex-col gap-sm">
    <h1 class="text-xl font-sans">Players</h1>
    <div class="grid grid-cols-2 gap-sm">
      <FieldSelect
        label="sort"
        :items="ratingKeys"
        item-title="label"
        item-value="key"
      ></FieldSelect>
      <FieldSelect
        label="sort direction"
        :items="['ascending', 'descending']"
      ></FieldSelect>
    </div>
    <ul class="grid grid-cols-2 gap-xs">
      <BaseCard
        v-for="player of players"
        :key="`roster-${player.player_id}`"
        tag="li"
      >
        <BaseCardTitle class="!flex justify-between">
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
          <BaseButton
            @click="lineupsStore.addPlayer(player)"
            variant="flat"
            icon="mdi-plus"
          />
        </BaseCardTitle>
        <BaseCardText>
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
        </BaseCardText>
      </BaseCard>
    </ul>
  </section>
</template>

<style></style>
