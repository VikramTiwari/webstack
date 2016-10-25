'use strict'

const express = require('express')
const compression = require('compression')
const http = require('http')
const cors = require('cors')
const db = require('./db')
const raven = require('raven')

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', console.log.bind(console, 'connected to mongodb'))

const app = express()
const server = http.Server(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser')

const client = new raven.Client('https://2125e22e971147aaa0bf88910a45da70:70f26f20d14f41f396012e5a3fb15ab4@sentry.io/109002')
client.patchGlobal()

app.locals.io = io

app.use(cors())
app.use(compression())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({
    params: req.params,
    query: req.query,
    body: req.body
  })
})

app.use('/api', require('./api'))

module.exports = server
