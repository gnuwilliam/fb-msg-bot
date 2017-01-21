//- require essentials
var request = require('request');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');

//- require config
var conf = require('./conf');

//- require messages module
var messages = require('./lib/messages');

//- init app
var app = express();

app.use(compression());
app.set('case sensitive routing', true);
app.use(bodyParser.json());

var httpServer = http.createServer(app);

//- set routes
app.get('/', function (req, res, next) {
    res.send('Welcome to Facebook Messenger Bot. This is root endpoint');
});

app.get('/webhook/', handleVerify);
app.post('/webhook/', receiveMessage);

//- handle routes
function handleVerify (req, res, next) {
    var token = process.env.VERIFY_TOKEN || conf.VERIFY_TOKEN;

    if (req.query['hub.verify_token'] === token) {
        return res.send(req.query['hub.challenge']);
    }

    res.send('Validation failed, Verify token mismatch');
}

/*
 *  Receives and handle message instances
 *  A message instance may look like this:
 *  [{
 *    sender: { id: 'SENDER_ID' },
 *    recipient: { id: 'RECIPIENT' },
 *    timestamp: TIMESTAMP,
 *    message:
 *      {
 *        is_echo: true|false,
 *        app_id: APP_ID,
 *        mid: 'MID',
 *        seq: SEQ,
 *        text: 'MSG_TEXT'
 *      }
 *  }]
 */
function receiveMessage (req, res, next) {
    //- capture message instances
    var message_instances = req.body.entry[0].messaging;

    //- log every message entry
    console.log(message_instances);

    message_instances.forEach(function (instance) {
        var sender = instance.sender.id;

        //- iterate message instances
        if (instance.message && instance.message.text) {
            var msg_text = instance.message.text;

            messages.sendMessage(sender, 'Hey! Welcome!');
        }
    });

    res.sendStatus(200);
}

//- start app
var port = conf.PORT;
httpServer.listen(port, function () {
    console.log('Express http server listening on port ' + port);
});
