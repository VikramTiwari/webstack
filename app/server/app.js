'use strict'

const express = require('express')
const compression = require('compression')
const http = require('http')
const cors = require('cors')
const db = require('./db')
const raven = require('raven')
let nconf = require('./config')

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', console.log.bind(console, 'connected to mongodb'))

const app = express()
const server = http.Server(app)
const io = require('socket.io')(server)
const bodyParser = require('body-parser')

if (process.env.NODE_ENV === 'production') {
  const client = new raven.Client(nconf.get('SENTRY_URL'))
  client.patchGlobal()
}

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
