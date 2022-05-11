const {IncomingWebhook} = require("@slack/webhook")

const webHooK = new IncomingWebhook(process.env.SLACK_WEBHOOK)

const loggerStream = {
    write: message => {
        webHooK.send({
            text: message
        })
      // do anything - emit to websocket? send message somewhere? log to cloud?
    },
};

module.exports = loggerStream