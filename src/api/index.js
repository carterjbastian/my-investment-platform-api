const express = require('express')
const app = (module.exports = express())

app.use(require('./ping'))
app.use(require('./user'))
