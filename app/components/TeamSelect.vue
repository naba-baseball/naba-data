<script lang="ts" setup>
const model = defineModel<number>()
const { teams } = useTeams()
const options = computed(() => teams.value.map(team => ({ label: team.name, value: team.team_id })))
</script>

<template>
  <UFormGroup label="Team">
    <USelect v-model.number="model" name="team" :options />
  </UFormGroup>
</template>
