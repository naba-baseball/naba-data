import type { H3Event } from 'h3'

export async function saveFile(event: H3Event, fileName: string) {
  const multipartArray = await readMultipartFormData(event)
  if (!multipartArray) return createError('error parsing multipart request')
  const [multipartData] = multipartArray
  if (!multipartData) return createError('error parsing data')
  const storage = useStorage('files')
  await storage.setItemRaw(fileName, multipartData.data)
}
