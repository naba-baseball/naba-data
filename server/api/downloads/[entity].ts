import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import JSZip from 'jszip'

export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Content-Type', 'application/zip')
  setResponseHeader(event, 'Cache-Control', 'no-cache')
  setResponseHeader(event, 'Transfer-Encoding', 'chunked')
  const entity = getRouterParam(event, 'entity')
  if (!entity || (entity !== 'csv' && entity !== 'database'))
    return createError({ statusCode: 400 })
  const zip = new JSZip()
  const cleanups: (() => void)[] = []
  if (entity === 'csv') {
    cleanups.push(await zipFile('teams'))
    cleanups.push(await zipFile('team_roster'))
    cleanups.push(await zipFile('players'))
    cleanups.push(await zipFile('players_batting'))
    cleanups.push(await zipFile('players_pitching'))
  }
  if (entity === 'database') {
    const handle = await fs.open('.data/db.sqlite3')
    zip.file('db.sqlite3', handle.createReadStream())
    cleanups.push(handle.close)
  }
  async function zipFile(name: string) {
    const stream = await getCSVStream(name)
    zip.file(`${name}.csv`, stream)
    return stream.close
  }
  return sendStream(event, zip.generateNodeStream({ compression: 'DEFLATE', compressionOptions: { level: 9 } })).then(() => {
    cleanups.forEach(cleanup => cleanup())
  })
})
async function getCSVStream(file: string) {
  const handle = await fs.open(path.join(`.data/files/${file}.csv`))
  return handle.createReadStream()
}
