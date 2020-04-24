let mongoose = require('mongoose')
let Schema = mongoose.Schema

const MetadataSchema = new Schema({
  projectName: String,
  records: [{ type: Number }],
})

module.exports = mongoose.model('Metadata', MetadataSchema)
