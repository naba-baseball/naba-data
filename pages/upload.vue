<script lang="ts" setup>
const selectedFiles = ref<any[]>([])
const { files, open } = useFileDialog({
  accept: 'text',
  multiple: true,
})
const requiredFiles = [
  'players_pitching.mysql.sql',
  'players_batting.mysql.sql',
  'players_fielding.mysql.sql',
  'players.mysql.sql',
  'teams.mysql.sql',
]
watchEffect(() => {
  if (!files.value)
    return
  for (const file of files.value) {
    if (requiredFiles.includes(file.name))
      selectedFiles.value.push(file)
  }
})
const missingFiles = computed(() => {
  const missingFiles = requiredFiles.filter(fileName => !selectedFiles.value.find(file => file.name === fileName))
  return missingFiles
})
async function submit() {
  const playersBatting = selectedFiles.value.find(file => file.name === 'players_batting.mysql.sql')
  const playersPitching = selectedFiles.value.find(file => file.name === 'players_pitching.mysql.sql')
  const playersFielding = selectedFiles.value.find(file => file.name === 'players_fielding.mysql.sql')
  const players = selectedFiles.value.find(file => file.name === 'players.mysql.sql')
  const teams = selectedFiles.value.find(file => file.name === 'teams.mysql.sql')
  const body = new FormData()
  body.append('file', playersBatting)
  body.append('file', playersPitching)
  body.append('file', playersFielding)
  body.append('file', players)
  body.append('file', teams)
  await $fetch('/api/upload', {
    method: 'POST',
    body,
  })
  // await $fetch(`/api/database`, { method: 'PUT' })
}
const { execute, status: uploadStatus, error: uploadError } = useAsyncData(submit, { immediate: false })
</script>

<template>
  <form name="select-files" @submit.prevent="execute">
    <button type="button" @click="open">
      select files
    </button>
    <div>
      <ul>
        <li v-for="file of selectedFiles">
          {{ file.name }} / {{ file.size / 1000 }} KB / {{ new Date(file.lastModified).toLocaleString('en-us', { timeStyle: 'medium', dateStyle: 'short' }) }}
        </li>
      </ul>
    </div>
    <template v-for="fileName of missingFiles">
      <div>
        missing {{ fileName }}
      </div>
    </template>
    <div>
      <p>
        <template v-if="uploadStatus === 'pending'">
          uploading...
        </template>
        <template v-if="uploadStatus === 'success'">
          done!
        </template>
        <template v-if="uploadStatus === 'error'">
          uh oh... {{ uploadError }}
        </template>
      </p>
    </div>
    <button :disabled="missingFiles.length !== 0" type="submit">
      upload
    </button>
  </form>
</template>
