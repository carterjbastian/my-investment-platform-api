var express = require('express')
var app = (module.exports = express())

app.get('/ping', async (req, res) => {
  res.send({
    startTime: req._startTime,
    params: req.query,
    response: 'pong',
  })
})

app.post('/ping', async (req, res) => {
  res.send({
    recieved: req.body,
    response: 'pong',
  })
})
