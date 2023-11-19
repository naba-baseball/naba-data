import type { H3Event } from 'h3'

export async function saveFile(event: H3Event, fileName?: string) {
  const data = await readFormData(event)
  for await (const chunk of data.entries()) {
    const [field, file] = chunk as [string, File]
    fileName ??= file.name
    const storage = useStorage('files')
    await storage.setItemRaw(fileName, file.stream())
  }
  return fileName
}
