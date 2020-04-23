const express = require('express')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/baseServer'

// I. Build the app
const app = express()

// II. Set up middleware
// enable http request logging
app.use(morgan('dev'))

// enable json message body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))

// Parse cookies
app.use(cookieParser()) // TODO(carter): Add JWT secret parsing

// III. Connect to DB

// Configure with generous options
mongoose.connect(DB_URI, {
  keepAlive: 30000,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true,
  connectTimeoutMS: 60000,
})
mongoose.Promise = require('bluebird')

// IV. Set up the routes
// Set the routes:
app.get('/', async (req, res) => {
  res.send('Base API')
})

app.use('/api', require('./api'))

// V. Start the server
const port = process.env.PORT || 5000
app.listen(port)

console.log(`Listening on port ${port}`)
