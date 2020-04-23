const express = require('express')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

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

// III. Set up the routes
// Set the routes:
app.get('/', async (req, res) => {
  res.send('Base API')
})

app.use('/api', require('./api'))

// IV. Start the server
const port = process.env.PORT || 5000
app.listen(port)

console.log(`Listening on port ${port}`)
