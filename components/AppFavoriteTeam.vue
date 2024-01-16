<script lang="ts" setup>
const team = useUserTeam();
watch(team, () => {
  if (!team.value) return;
  $fetch("/api/setCookie", {
    method: "post",
    body: {
      name: "userFavoriteTeam",
      value: team.value,
    },
  });
});
</script>

<template>
  <team-select density="compact" label="Favorite team" v-model="team" />
</template>

