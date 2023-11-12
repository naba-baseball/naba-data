import { finished } from 'node:stream/promises'
import Busboy from '@fastify/busboy'
import type { H3Event } from 'h3'

export async function saveFile(event: H3Event, fileName?: string) {
  const busboy = new Busboy({ headers: getRequestHeaders(event) })
  event.node.req.pipe(busboy)
  busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
    fileName ??= filename
    const storage = useStorage('files')
    await storage.setItemRaw(filename, file)
  })
  await finished(busboy)
  return fileName
}
