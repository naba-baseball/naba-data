import { get, set } from 'idb-keyval'

const requiredFiles = [
  'teams.csv',
  'team_roster.csv',
  'players.csv',
  'players_pitching.csv',
  'players_batting.csv',
]
export const fileUploadsStore = defineStore('fileUploads', () => {
  const csvDirHandle = shallowRef<FileSystemDirectoryHandle>()
  const hasDirReadPermission = ref(false)
  const { isActive: isUserActive } = useUserActivation()
  const { isWatching: watchingDirectory } = useWatchDirectory()
  const { lastUploadedDate } = useLastUploaded()

  watch([isUserActive, watchingDirectory], async ([isUserActive, isWatchingDirectory]) => {
    if (!isUserActive || !isWatchingDirectory)
      return
    csvDirHandle.value = await get<FileSystemDirectoryHandle>('handles:csv_directory')
    try {
      if (csvDirHandle.value) {
        const permissionState = await csvDirHandle.value.queryPermission({ mode: 'read' })
        if (permissionState === 'granted') {
          hasDirReadPermission.value = true
        }
        if (permissionState === 'prompt') {
          hasDirReadPermission.value = await csvDirHandle.value.requestPermission({ mode: 'read' }) === 'granted'
        }
      }
    }
    catch (err) {
      useToast().add({ title: 'Error', description: 'An error occurred while checking for files.', timeout: 0 })
    }
  }, { immediate: true })

  const files = ref<File[]>([])

  async function refreshFiles() {
    if (!csvDirHandle.value || !hasDirReadPermission.value)
      return
    files.value = await readDir(csvDirHandle.value, lastUploadedDate.value ?? 0)
  }
  const missingFiles = computed(() => {
    const missingFiles = requiredFiles.filter(
      fileName => !files.value.find(file => file.name === fileName),
    )
    return missingFiles
  })
  const { pause, resume } = useTimeoutPoll(refreshFiles, 1000, { immediate: true })
  watch(files, (files) => {
    if (files.length > 0)
      pause()
    else resume()
  })
  return { files, missingFiles, refreshFiles }
})

export function useFileUploads() {
  const store = fileUploadsStore()
  return {
    files: toRef(store, 'files'),
    refreshFiles: store.refreshFiles,
  }
}
async function readDir(dirHandle: FileSystemDirectoryHandle, lastModifedDate = 0) {
  const files = await Promise.all(requiredFiles.map(async (name) => {
    try {
      const fileHandle = await dirHandle.getFileHandle(name)
      const file = await fileHandle.getFile()
      if (file.lastModified > lastModifedDate) {
        return file
      }
      return null
    }
    catch (e) {
      return null
    }
  }))
  return files.filter(file => file !== null)
}
