const express = require('express')
const app = (module.exports = express())

const { Metadata } = require('../models')

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

app.get('/metadata', async (req, res) => {
  let metadataCount = await Metadata.countDocuments()
  let firstMetadata = await Metadata.findOne({})
  res.send({
    count: metadataCount,
    example: firstMetadata,
  })
})
