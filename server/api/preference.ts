export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const query = getQuery(event)
    const key = query.key as string
    if (!key) {
      return
    }
    const storage = useStorage('preferences')
    return storage.getItem(key)
  }
  if (event.method === 'POST') {
    const body = await readBody(event)
    const key = body.key as string
    const value = body.value
    if (!key || value == null) {
      return createError({ message: 'Key and value are required', status: 400 })
    }
    const storage = useStorage('preferences')
    await storage.setItem(key, value)
    return
  }
  return ''
})
