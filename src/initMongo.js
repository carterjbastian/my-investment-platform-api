let mongoose = require('mongoose')

const DB_NAME = 'baseServer'
const DB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${DB_NAME}`

module.exports = () => {
  mongoose.connect(DB_URI, {})
  mongoose.Promise = require('bluebird')
}
