<script lang="ts" setup>
const selectedFiles = ref<any[]>([])
const { files, open } = useFileDialog({
  accept: 'text/csv',
  multiple: true,
})
const requiredFiles = [
  'players_pitching.csv',
  'players_batting.csv',
  'players_fielding.csv',
  'players.csv',
  'teams.csv',
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

function createFormBody(file: File) {
  const body = new FormData()
  body.append('file', file)
  return body
}
async function submit() {
  const playersBatting = selectedFiles.value.find(file => file.name === 'players_batting.csv')
  const playersPitching = selectedFiles.value.find(file => file.name === 'players_pitching.csv')
  const playersFielding = selectedFiles.value.find(file => file.name === 'players_fielding.csv')
  const players = selectedFiles.value.find(file => file.name === 'players.csv')
  const teams = selectedFiles.value.find(file => file.name === 'teams.csv')
  const requests = [
    $fetch('/api/upload', {
      method: 'POST',
      body: createFormBody(playersBatting),
    }),
    $fetch('/api/upload', {
      method: 'POST',
      body: createFormBody(playersPitching),
    }),
    $fetch('/api/upload', {
      method: 'POST',
      body: createFormBody(playersFielding),
    }),
    $fetch('/api/upload', {
      method: 'POST',
      body: createFormBody(players),
    }),
    $fetch('/api/upload', {
      method: 'POST',
      body: createFormBody(teams),
    }),
  ]
  await Promise.all(requests)
  await $fetch('/api/database', { method: 'PUT' })
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
