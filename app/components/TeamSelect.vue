<script lang="ts" setup>
const model = defineModel<number>()
const { teams } = useTeams()
const items = computed(() => teams.value.map(team => ({ text: team.name, value: team.team_id })))
</script>

<template>
  <FieldSelect v-model="model" label="team" :items />
</template>
