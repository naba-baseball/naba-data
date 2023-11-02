import papa from 'papaparse'

export async function extractRatingsFromCSV(fileName: string, collectionName: string) {
    const file = (await useStorage('files').getItem(fileName)) as string
    const { data: rows } = papa.parse(file, {
      header: true,
      dynamicTyping: true
    })
    const mapping = rows.reduce((mapping, row) => {
      mapping[row['player_id']] ??= row
      return mapping
    }, {})
    const ops = []
    const redis = useStorage('redis')
    const db = useDB().db('ratings')
    const coll = await db.createCollection(collectionName)
    for (const [playerId, rows] of Object.entries(mapping)) {
      ops.push(coll.insertOne(rows))
      ops.push(redis.setItem(`${collectionName}:${playerId}`, JSON.stringify(rows)))
    }
  }