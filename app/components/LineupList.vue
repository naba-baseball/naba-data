<script lang="ts" setup generic="T extends {player_id: number, first_name: string, last_name: string}">
import { useDragAndDrop } from '@formkit/drag-and-drop/vue'

const { players = [] } = defineProps<{ players?: T[], title?: string }>()

const [listRef, sortedItems] = useDragAndDrop(players, {
  dragHandle: '.lineup-list-drag-handle',
  longPress: true,
  draggingClass: 'dark:bg-primary-950 bg-primary-50',
  longPressClass: 'dark:bg-primary-950 bg-primary-50',
})
watchEffect(() => {
  sortedItems.value = players
})
</script>

<template>
  <table class="[&_*]:text-start w-full">
    <caption v-if="title" class="text-xl font-bold">
      {{ title }}
    </caption>
    <thead class="text-xs uppercase opacity-90 [&_th]:font-medium ">
      <tr class="border-b h-10">
        <th>
          <UIcon name="i-lucide-grip-vertical" />
        </th>
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
        <th>
          <UIcon title="click and drag" class="hidden sm:block lineup-list-drag-handle cursor-grab" name="i-lucide-grip-vertical" />
          <UIcon title="long press and drag" class=" sm:hidden text-xl lineup-list-drag-handle cursor-grab" name="i-lucide-grip-vertical" />
        </th>
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
