<script lang="ts" setup>
import { useSortable } from "@vueuse/integrations/useSortable";
defineRouteRules({
  ssr: false,
});
const team = ref();

const { data: teamPlayers } = useFetch(
  () => `/api/teams/${team.value}/batters`,
  {
    deep: false,
    lazy: true,
    transform(data) {
      return data.map((player) => {
        return reactive({
          first_name: player.first_name,
          last_name: player.last_name,
          bats: useBatsAbbreviation(player),
          age: player.age,
          position: usePositionDisplay(player),
          contact: computed(() => getSplit(player, "contact")),
          eye: computed(() => getSplit(player, "eye")),
          gap: computed(() => getSplit(player, "gap")),
          power: computed(() => getSplit(player, "power")),
          strikeouts: computed(() => getSplit(player, "strikeouts")),
        });
      });
    },
  },
);
const { getSplit, split } = useBattingSplits();

const lineup = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);

const ratingKeys = [
  { key: "contact", label: "Contact" },
  { key: "eye", label: "Eye" },
  { key: "gap", label: "Gap" },
  { key: "power", label: "Power" },
  { key: "strikeouts", label: "Ks" },
];
const roster = ref(2);
const rosterOptions = [
  { value: 1, label: "Reserve" },
  { value: 2, label: "Primary" },
];
const filteredPlayers = computed(() => {
  return teamPlayers.value.filter((player) => {
    return player.bats.value === split.value;
  });
});
</script>

<template>
  <main class="flow-flex-grid flex-col">
    <fieldset class="flex gap-sm">
      <TeamSelect color="primary" v-model="team" />
      <BattingSplitSelect v-model="split" />
      <UFormGroup label="Roster">
        <USelect v-model="roster" :options="rosterOptions" />
      </UFormGroup>
    </fieldset>
    <div class="grid grid-cols-2 gap-sm">
      <section>
        <h1 class="text-xl font-sans">Players</h1>
        <ul class="grid grid-cols-2 gap-xs">
          <u-card as="li" v-for="player of teamPlayers">
            <template #header>
              <div>
                <div class="">
                  {{ player.position }} {{ player.first_name }}
                  {{ player.last_name }}
                </div>
                <div class="flex gap-sm text-surface-700 text-xs uppercase">
                  <div>Age {{ player.age }}</div>
                  <div>Bats {{ player.bats }}</div>
                </div>
              </div>
            </template>
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
          </u-card>
        </ul>
      </section>
      <section>
        <div>
          <h1 class="text-xl font-sans">Vs RHP</h1>
          <UCard
            as="ul"
            :ui="{
              ring: '',
              base: 'border border-dashed border-gray-200 p-4',
              shadow: '',
            }"
            class="flex flex-col gap-xs"
          >
            Drag and drop players here!
          </UCard>
        </div>
      </section>
    </div>
  </main>
</template>

<style></style>
