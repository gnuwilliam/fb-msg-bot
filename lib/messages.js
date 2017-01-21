//- require essentials
var request = require('request');

var conf = require('../conf');

//- send message to receiver
var sendMessage = function (receiver, msg) {
    if (!receiver || !msg) {
        console.log('Error sending message: ', 'Missing params');
    }
    var payload = { text: msg };

    request(
        {
            url: conf.FB_MESSAGE_URL,
            method: 'POST',
            qs: {
                access_token: process.env.PROFILE_TOKEN || conf.PROFILE_TOKEN
            },
            json: {
                recipient: { id: receiver },
                message: payload
            }
        },
        function (error, response) {
            if (error) console.log('Error sending message: ', error);
            if (response.body.error) console.log('Error: ', response.body.error);
        }
    );
}

//- quickReply function
var quickReply = function (receiver, msg, options) {
    if (!receiver || !msg || !options) {
        console.log('Error sending message: ', 'Missing params');
    }
    
    request(
        {
            url: conf.FB_MESSAGE_URL,
            method: 'POST',
            qs: {
                access_token: process.env.PROFILE_TOKEN || conf.PROFILE_TOKEN
            },
            json: {
                recipient: { id: receiver },
                message: {
                    text: msg,
                    quick_replies: options
                }
            }
        },
        function (error, response) {
            if (error) console.log('Error sending message: ', error);
            if (response.body.error) console.log('Error: ', response.body.error);
        }
    );
}

//- isTyping function
var isTyping = function (receiver) {
    request(
        {
            url: conf.FB_MESSAGE_URL,
            method: 'POST',
            qs: {
                access_token: process.env.PROFILE_TOKEN || conf.PROFILE_TOKEN
            },
            json: {
                recipient: { id: receiver },
                sender_action: "typing_on"
            }
        },
        function (error, response) {
            if (error) console.log('Error sending message: ', error);
            if (response.body.error) console.log('Error: ', response.body.error);
        }
    );
}

module.exports = {
    sendMessage: sendMessage,
    quickReply: quickReply,
    isTyping: isTyping
};
