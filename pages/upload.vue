<script lang="ts" setup>
const { files, open } = useFileDialog({
  accept: "text",
  multiple: true,
});
const requiredFiles = [
  "teams.csv",
  "team_roster.csv",
  "players.csv",
  "players_pitching.csv",
  "players_batting.csv",
  "players_fielding.csv",
  "players_contract.csv",
];
const selectedFiles = computed(() => {
  const selectedFiles: File[] = [];
  if (!files.value) return selectedFiles;
  for (const file of files.value) {
    if (requiredFiles.includes(file.name)) selectedFiles.push(file);
  }
  return selectedFiles;
});
const missingFiles = computed(() => {
  const missingFiles = requiredFiles.filter(
    (fileName) => !selectedFiles.value.find((file) => file.name === fileName),
  );
  return missingFiles;
});
const statusMessage = ref();
async function submit() {
  statusMessage.value = "uploading...";
  const body = new FormData();
  for (const file of selectedFiles.value) body.append("file", file);
  await $fetch("/api/upload", {
    method: "POST",
    body,
  });
  statusMessage.value = "extracting...";
  await $fetch("/api/database", { method: "PUT" });
  statusMessage.value = "done :)";
}
const { execute, status, error, pending } = useAsyncData(submit, {
  immediate: false,
});
watchEffect(() => {
  if (error.value) statusMessage.value = `error! ${error.value}`;
});
</script>

<template>
  <form name="select-files" class="p-4" @submit.prevent="execute">
    <button class="btn border" type="button" @click="open">select files</button>
    <div>
      <ul>
        <li v-for="file of selectedFiles" :key="file.name">
          {{ file.name }} / {{ file.size / 1000 }} KB /
          {{
            new Date(file.lastModified).toLocaleString("en-us", {
              timeStyle: "medium",
              dateStyle: "short",
            })
          }}
        </li>
      </ul>
    </div>
    <template v-for="fileName of missingFiles" :key="fileName">
      <div>missing {{ fileName }}</div>
    </template>
    <div>
      <p>
        <template v-if="pending || error || status === 'success'">
          {{ statusMessage }}
        </template>
      </p>
    </div>
    <button class="btn bg-primary flex items-center gap-2" :disabled="missingFiles.length !== 0" type="submit">
     <span class="block i-lucide-upload"></span> upload
    </button>
  </form>
</template>
