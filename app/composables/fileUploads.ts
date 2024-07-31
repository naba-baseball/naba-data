import { get, set } from 'idb-keyval'

const requiredFiles = [
  'teams.csv',
  'team_roster.csv',
  'players.csv',
  'players_pitching.csv',
  'players_batting.csv',
  'players_career_batting_stats.csv',
]
const useFilesState = () => useState<File[]>('uploadedFiles', () => [])
const useCsvDirHandle = () => useState<FileSystemDirectoryHandle>('csvDirHandle')

export function useFileUploads() {
  const csvDirHandle = useCsvDirHandle()
  const { hasDirReadPermission } = watchDirectory(csvDirHandle)
  const { lastUploadedDate } = useLastUploaded()
  const files = useFilesState()
  const missingFiles = computed(() => {
    const missingFiles = requiredFiles.filter(
      fileName => !files.value.find(file => file.name === fileName),
    )
    return missingFiles
  })
  function filterFiles(arr: File[]) {
    return arr.filter(file => requiredFiles.includes(file.name))
  }
  return {
    files: computed({
      get() {
        return files.value
      },
      set: (arr: File[]) => {
        files.value = filterFiles(arr)
      },
    }),
    missingFiles,
    checkFiles: async () => {
      if (!csvDirHandle.value || !hasDirReadPermission.value)
        return
      const foundFiles = await readDir(csvDirHandle.value, lastUploadedDate.value ?? 0)
      if (!foundFiles.length)
        return
      files.value = filterFiles(foundFiles)
    },
    getFiles: async (updatedDate?: number) => {
      const foundFiles = await readDir(csvDirHandle.value, updatedDate)
      if (!foundFiles.length)
        return
      files.value = filterFiles(foundFiles)
    },
    dirHandle: csvDirHandle,
    setDirHandle: (handle: FileSystemDirectoryHandle) => {
      set('handles:csv_directory', handle)
      csvDirHandle.value = handle
    },
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

function watchDirectory(dirHandleRef: Ref<FileSystemDirectoryHandle | undefined>) {
  const hasDirReadPermission = ref(false)
  const { isActive: isUserActive } = useUserActivation()
  watch([isUserActive, useWatchDirectoryPreference()], async ([isUserActive, isWatchingDirectory]) => {
    if (!isUserActive || !isWatchingDirectory)
      return
    const savedHandle = await get<FileSystemDirectoryHandle>('handles:csv_directory')
    if (savedHandle)
      dirHandleRef.value = savedHandle
    try {
      if (dirHandleRef.value) {
        const permissionState = await dirHandleRef.value.queryPermission({ mode: 'read' })
        if (permissionState === 'granted') {
          hasDirReadPermission.value = true
        }
        if (permissionState === 'prompt') {
          hasDirReadPermission.value = await dirHandleRef.value.requestPermission({ mode: 'read' }) === 'granted'
        }
      }
    }
    catch (err) {
      console.error(err)
      useToast().add({ title: 'Error', description: 'An error occurred while checking for files.', timeout: 0 })
    }
  }, { immediate: true })
  return { hasDirReadPermission }
}
