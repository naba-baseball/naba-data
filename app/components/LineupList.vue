<script lang="ts" setup generic="T extends {player_id: number, first_name: string, last_name: string}">
import { useDragAndDrop } from '@formkit/drag-and-drop/vue'

const props = withDefaults(defineProps<{
  players?: T[]
  title: string
}>(), { players: () => [] })
const [listRef, sortedItems] = useDragAndDrop(props.players)
watchEffect(() => {
  sortedItems.value = props.players
})
</script>

<template>
  <table class="[&_*]:text-start w-full">
    <caption class="text-xl font-bold">
      {{ title }}
    </caption>
    <thead class="text-xs uppercase opacity-90 [&_th]:font-medium">
      <tr>
        <th scope="col">
          #
        </th>
        <slot name="prepend-th" />
        <th scope="col">
          Player
        </th>
        <slot name="append-th" />
      </tr>
    </thead>
    <tbody ref="listRef">
      <tr v-for="(player, i) of sortedItems" :key="player.player_id">
        <th scope="row">
          {{ i + 1 }}
        </th>
        <slot name="prepend-td" :player :index="i" />
        <td>
          <slot name="name" :player :index="i">
            {{ player.first_name }} {{ player.last_name }}
          </slot>
        </td>
        <slot name="append-td" :player :index="i" />
      </tr>
    </tbody>
  </table>
</template>
