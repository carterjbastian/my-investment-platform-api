const initMongo = require('../initMongo')
initMongo()

const Metadata = require('../models/metadata')

async function main() {
  let results = await Metadata.find({})
  console.log('before')
  console.log(JSON.stringify(results, null, 2))

  // Now write a Metadata object
  const newRecord = await Metadata.findOneAndUpdate(
    { projectName: 'Test' },
    { records: [0, 1, 3, 5] },
    { upsert: true },
  )

  console.log('Added a record')
  console.log(JSON.stringify(newRecord, null, 2))

  console.log('after')
  results = await Metadata.find({})
  console.log(JSON.stringify(results, null, 2))
}

if (require.main === module) {
  main().then(() => {
    console.log('All done!')
    process.exit()
  })
}
