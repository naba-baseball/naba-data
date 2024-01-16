<script lang="ts" setup>
const lineupsStore = useLineupsStore();
const { ratingKeys, lineup } = toRefs(lineupsStore);
</script>

<template>
  <section class="flex flex-col gap-sm">
    <div class="inline-flex items-end gap-sm">
      <h1 class="text-xl font-sans">Lineup</h1>
      <span>{{ lineup.length }} / 9 players</span>
    </div>
    <div>
      <VSelect
        :items="['vs RHP', 'vs LHP']"
        model-value="vs RHP"
        label="Lineup"
      />
    </div>
    <div class="grid gap-sm">
      <VSlideYTransition group>
        <template v-for="(player, index) of lineup" :key="player.player_id">
          <VCard>
            <div class="grid grid-cols-[1fr_auto]">
              <VCardTitle
                class="!grid grid-cols-subgrid grid-col-start-1 grid-col-end-[-1]"
              >
                <div>
                  <div>
                    {{ player.position }} {{ player.first_name }}
                    {{ player.last_name }}
                  </div>
                  <div class="flex gap-sm text-surface-700 text-xs uppercase">
                    <div>Age {{ player.age }}</div>
                    <div>Bats {{ player.bats }}</div>
                  </div>
                </div>
                <div class="">
                  <v-btn variant="flat" icon="mdi-minus" />
                  <v-btn
                    :disabled="index == 0"
                    variant="flat"
                    icon="mdi-arrow-up"
                  />
                  <v-btn
                    :disabled="index == lineup.length - 1"
                    variant="flat"
                    icon="mdi-arrow-down"
                  />
                </div>
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
            </div>
          </VCard>
        </template>
      </VSlideYTransition>
    </div>
  </section>
</template>

<style></style>
