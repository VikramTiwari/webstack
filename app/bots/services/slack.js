const Botkit = require('botkit')
const controller = require('../controller')
let nconf = require('../config')

let slackController = Botkit.slackbot({
  // debug: true
})

let bot = slackController.spawn({
  token: nconf.get('SLACK_BOT_TOKEN')
}).startRTM()

slackController.hears(['.*'], 'direct_message,direct_mention,mention', function (bot, message) {
  controller.slack.reciever(bot, message)
})
