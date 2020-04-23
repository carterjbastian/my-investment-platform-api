var express = require('express')
var app = express()

app.use(require('./ping'))

module.exports = app
