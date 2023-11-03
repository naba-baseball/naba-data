import papa from 'papaparse'

export async function extractRatingsFromCSV(
  fileName: string,
  collectionName: string
) {
  const file = (await useStorage('files').getItem(fileName)) as string
  const { data: rows } = papa.parse(file, {
    header: true,
    dynamicTyping: true
  })
  const db = useDB().db('ratings')
  await db.dropCollection(collectionName)
  const coll = await db.createCollection(collectionName)
  await coll.insertMany(rows)
}
