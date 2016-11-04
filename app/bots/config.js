'use strict'

// Hierarchical node.js configuration with command-line arguments, environment
// variables, and files.
var nconf = module.exports = require('nconf')
var path = require('path')
var env = process.env.NODE_ENV || 'dev'

nconf
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env([
    'SLACK_BOT_TOKEN'
  ])
  // 3. Config file
  .file({ file: path.join(__dirname, `env.${env}.json`) })
  // 4. Defaults
  .defaults({})

// Check for required settings

function checkConfig (setting) {
  if (!nconf.get(setting)) {
    throw new Error(`You must set the ${setting} environment variable or add it to env.${env}.json!`)
  } else {
    console.log(`${setting} present`)
  }
}

checkConfig('SLACK_BOT_TOKEN')
