export default defineEventHandler(async () => {
  const [adminUser] = await useSqlite()
    .selectFrom('users')
    .select('role')
    .where('role', '=', 'admin')
    .execute()
  const filesUploaded = await useStorage('files').getKeys()
  return {
    hasAdmin: !!adminUser,
    hasUploadedFiles: filesUploaded.length > 0,
  }
})
