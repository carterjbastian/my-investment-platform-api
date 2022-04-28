const express = require('express')
const cors = require('cors')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const initMongo = require('./initMongo')

// I. Connect to MongoDB
initMongo()

// II. Build the app
const app = express()

// III. Set up middleware
// enable http request logging
app.use(morgan('dev'))

// Enable Cross Origin Requests TODO(carter): restrict better
app.use(cors())

// enable json message body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))

// Parse cookies
app.use(cookieParser()) // TODO(carter): Add JWT secret parsing

// IV. Set up the routes
// Set the routes:
app.get('/', async (req, res) => {
  res.send('My Investment Platform API')
})

app.use('/api', require('./api'))

// V. Start the server
const port = process.env.PORT || 5050
app.listen(port)

console.log(`Listening on port ${port}`)
