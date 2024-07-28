import { eq } from 'drizzle-orm'

export default defineEventHandler(async () => {
  const [adminUser] = await useSqlite().select()
    .from(usersTable)
    .where(eq(usersTable.role, 'admin'))
  const filesUploaded = await useStorage('files').getKeys()
  return {
    hasAdmin: !!adminUser,
    hasUploadedFiles: filesUploaded.length > 0,
  }
})
