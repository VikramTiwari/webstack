'use strict'

const Language = require('@google-cloud/language')
const path = require('path')
const debug = require('debug')('bot')
let nconf = require('../config')

const languageClient = Language({
  projectId: nconf.get('GCP_PROJECT_ID'),
  keyFilename: path.join(__dirname, nconf.get('GCP_SERVICE_ACCOUNT_KEY_FILE'))
})

exports.detectSentiment = function detectSentiment (text, cb) {
  languageClient.detectSentiment(text, { verbose: true }, (err, sentiment) => {
    if (err) {
      console.error(err)
    } else {
      debug(sentiment)
      cb(err, sentiment)
    }
  })
}
