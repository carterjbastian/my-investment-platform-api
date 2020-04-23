const express = require('express')
const app = express()

app.use(require('./ping'))

module.exports = app
